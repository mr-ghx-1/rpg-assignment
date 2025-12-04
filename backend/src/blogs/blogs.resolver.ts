import { Resolver, Mutation, Args, Query, Subscription } from '@nestjs/graphql';
import { UseGuards, Inject } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blog.entity';
import { GqlAuthGuard } from '../users/gql-auth.guard';
import { CurrentUser } from '../users/current-user.decorator';
import { User } from '../users/user.entity';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../pubsub/pubsub.module';

@Resolver(() => Blog)
export class BlogsResolver {
    constructor(
        private readonly blogsService: BlogsService,
        @Inject(PUB_SUB) private readonly pubSub: PubSub,
    ) { }

    @Query(() => [Blog])
    blogs() {
        return this.blogsService.findAll();
    }

    @Mutation(() => Blog)
    @UseGuards(GqlAuthGuard)
    async createBlog(
        @Args('title') title: string,
        @Args('content') content: string,
        @CurrentUser() user: User,
    ) {
        const blog = await this.blogsService.create(title, content, user);
        this.pubSub.publish('blogAdded', { blogAdded: blog });
        return blog;
    }

    @Subscription(() => Blog)
    blogAdded() {
        return this.pubSub.asyncIterator('blogAdded');
    }
}
