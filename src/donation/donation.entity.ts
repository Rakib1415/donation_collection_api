import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
}
