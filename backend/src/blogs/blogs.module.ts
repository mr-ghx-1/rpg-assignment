import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blogs.service';
import { BlogsResolver } from './blogs.resolver';
import { Blog } from './blog.entity';
import { PubSubModule } from '../pubsub/pubsub.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Blog]),
        PubSubModule,
    ],
    providers: [BlogsService, BlogsResolver],
})
export class BlogsModule { }
