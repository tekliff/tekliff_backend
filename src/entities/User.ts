import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Company } from "./Company";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  is_active: boolean;

  @Column({
    type: "text",
    nullable: true,
    unique: true,
  })
  activation_token: string | null;

  @Column({
    nullable: true,
    type: "timestamptz",
  })
  activation_token_expires: Date;

  @Column({
    type: "text",
    nullable: true,
    unique: true,
  })
  reset_password_token: string | null;

  @Column({
    nullable: true,
  })
  reset_password_token_expires: Date;

  @Column({
    default: "",
  })
  avatar_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Company, (company) => company.users)
  @JoinTable({
    name: "users_companies",
    joinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "company",
      referencedColumnName: "id",
    },
  })
  companies: Company[];
}
