// Product Entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import  { AdminEntity }  from './Admin';
import { Category } from './Category';
import { PhotoProduct } from './ProductPhoto';

@Entity("products")
export default class Product {
    @PrimaryGeneratedColumn()
    product_id!: number;

    @ManyToOne(() => AdminEntity)
    admin!: AdminEntity;

    @Column()
    name_product!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @Column()
    stock!: number;

    @Column()
    main_photo!: string;

    @ManyToOne(() => Category)
    category!: Category;

    @Column()
    created_at?: Date;

    @Column()
    updated_at?: Date;

    @OneToMany(() => PhotoProduct, photo => photo.product)
    photos!: PhotoProduct[];
}
