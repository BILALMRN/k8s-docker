// Photo Entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import  Product from './Product';

@Entity("photoProduct")
export class PhotoProduct {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Product, product => product.photos)
    product!: Product;

    @Column()
    url!: string;
}
