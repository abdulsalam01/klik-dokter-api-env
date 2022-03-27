import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { BaseRequest, LoginData } from './users.model';
import { Utils } from './../utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async findAll(params: BaseRequest): Promise<User[]> {
        const data = await this.repository.find(params);

        data.map((v: User) => delete v.password);
        return data;
    }

    async findOne(params: any): Promise<User> {
        const data = await this.repository.findOne( { where: params } );

        delete data.password;
        return data;
    }

    async create(user: User): Promise<User> {
        const hashPassword = await Utils.encrypt(user.password);
        const data = await this.repository.save({
            email: user.email,
            password: hashPassword
        });

        delete data.password;
        return data;
    }

    async update(user: User): Promise<UpdateResult> {
        return await this.repository.update(user.id, user);
    }

    async delete(params: any): Promise<DeleteResult> {
        return await this.repository.delete(params);
    }

    // custom-gate-function
    async login(data: LoginData): Promise<User> {
        const findUser = await this.repository.findOne({ where: { email: data.email } });
        // find by mail
        if (findUser) {
            // encypt password
            const hashPassword = await Utils.encrypt(data.password);
            // checking the buffer
            if (hashPassword === findUser.password) {
                // generated token-jwt
                const token = this.jwtService.sign(data);
                const user = { ...findUser, token }

                return user;
            }

            throw new UnauthorizedException();
        }

        throw new UnauthorizedException();
    }
}
