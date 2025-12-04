import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(Blog)
        private blogsRepository: Repository<Blog>,
    ) { }

    async create(title: string, content: string, user: User): Promise<Blog> {
        const blog = this.blogsRepository.create({
            title,
            content,
            author: user,
            authorId: user.id,
        });
        return this.blogsRepository.save(blog);
    }

    async findAll(): Promise<Blog[]> {
        return this.blogsRepository.find({ relations: ['author'], order: { createdAt: 'DESC' } });
    }
}
