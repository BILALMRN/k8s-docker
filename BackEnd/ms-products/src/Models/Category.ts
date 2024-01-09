// Category Entity
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    category_id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;
}
