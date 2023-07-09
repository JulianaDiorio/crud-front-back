import { hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: false })
  avatar: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 10, nullable: false })
  date_birth: string;

  @Column({ length: 120 })
  password: string;

  @Column({ nullable: true, default: true })
  isActive: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword() {
    this.password = hashSync(this.password, 10);
  }
}

export { User };
