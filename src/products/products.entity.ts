import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Unit } from "./products.model";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku: string;

    @Column()
    name: string;

    @Column()
    qty: number;

    @Column()
    price: string;

    @Column()
    unit: Unit;

    @Column()
    status: number;
}