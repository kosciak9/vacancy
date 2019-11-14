import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";

import { Lazy } from "helpers";
import Template from "./Template";
import User from "./User";

@Entity()
@ObjectType()
export default class Organization {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(type => String)
  @Column()
  name!: string;

  @Field(type => String, { nullable: true })
  @Column()
  locale!: string;

  @Field(type => Int, { nullable: true })
  @Column()
  weekStartsOn!: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  @Field(type => User)
  @OneToOne(type => User)
  @JoinColumn()
  admin: User;

  @Field(type => [User])
  @OneToMany(type => User, user => user.organization, {
    lazy: true
  })
  users: Lazy<User[]>;

  @Field(type => [Template])
  @OneToMany(type => Template, template => template.organization, {
    lazy: true
  })
  templates: Lazy<Template[]>;
}
