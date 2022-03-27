import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Product } from './products.entity';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from './../users/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  async find(@Query() query) {
    return this.productsService.findAll({
      take: query?.take | 10,
      skip: query?.skip | 0,
    })
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('id')
  async findOne(@Body() params) {
    return this.productsService.findOne( { sku: params.sku } );
  }

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('create')
  async create(@Body() data: Product) {
    return this.productsService.create(data);
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('delete')
  async delete(@Body('sku') sku: string) {
    return this.productsService.delete({ sku });
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('update')
  async update(@Body() data: Product) {
    return this.productsService.update(data);
  }
}
