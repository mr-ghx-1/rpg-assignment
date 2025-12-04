import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthInput, AuthResponse } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signup(authInput: AuthInput): Promise<AuthResponse> {
        const { username, password } = authInput;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ username, passwordHash });
        await this.usersRepository.save(user);

        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken, user };
    }

    async login(authInput: AuthInput): Promise<AuthResponse> {
        const { username, password } = authInput;
        const user = await this.usersRepository.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken, user };
    }

    async findOne(username: string): Promise<User> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async findById(id: number): Promise<User> {
        return this.usersRepository.findOne({ where: { id } });
    }
}
