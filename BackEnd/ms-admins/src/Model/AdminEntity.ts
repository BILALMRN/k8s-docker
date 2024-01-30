import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('admins')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  admin_id?: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password_hash!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  urlPhotoProfile?: string;

  @Column({ nullable: true })
  coverPhoto?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  zip?: string;

  @Column({ nullable: true })
  country?: string;

  @CreateDateColumn()
  created_at?: Date;

}
