// Product Entity
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity("products")
export default class Product {
  @PrimaryGeneratedColumn()
  product_id!: number;

  @Column()
  admin_id!: number;

  @Column()
  name_product!: string;

  @Column()
  description!: string;

  @Column('double precision') // Change data type to double precision
  price!: number;

  @Column({default: 0})
  discountPrice?: number;

  @Column()
  stock!: number;

  @Column({default: 0})
  main_photo!: string;

  @Column()
  category!: string;

  @CreateDateColumn()
  created_at?: Date;

  @CreateDateColumn()
  updated_at?: Date;

  @Column()
  photos!: string;
}
