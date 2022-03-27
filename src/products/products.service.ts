import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from './products.entity';
import { BaseRequest } from './products.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private repository: Repository<Product>
    ) {}

    async findAll(params: BaseRequest): Promise<Product[]> {
        return await this.repository.find(params);
    }

    async findOne(params: any): Promise<Product> {
        return await this.repository.findOne( { where: params });
    }

    async create(product: Product): Promise<Product> {
        return await this.repository.save(product);
    }

    async update(product: Product): Promise<UpdateResult> {
        return await this.repository.update(product.id, product);
    }

    async delete(params: any): Promise<DeleteResult> {
        return await this.repository.delete(params);
    }
}
