import { Exclude } from 'class-transformer';
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @AfterInsert()
  logAfter() {
    console.log('after insert the user to db', this.id);
  }
}
