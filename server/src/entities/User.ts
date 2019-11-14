import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { compare, hash } from "bcrypt";

import Availability from "./Availability";
import { Lazy } from "helpers";
import Organization from "entities/Organization";

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

@Entity()
@ObjectType()
export default class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(type => String)
  @Column()
  name!: string;

  @Field(type => String)
  @Column()
  email!: string;

  @Field(type => String)
  @Column()
  locale!: string;

  @Field(type => Organization, { nullable: true })
  @ManyToOne(type => Organization, organization => organization.users, {
    lazy: true,
    nullable: true
  })
  organization: Lazy<Organization>;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, SALT_ROUNDS);
  }

  @Field(type => Availability)
  availabilities: Availability[];
}
