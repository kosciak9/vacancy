import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";

import { Lazy } from "helpers";
import Organization from "./Organization";

@Entity()
@ObjectType()
export default class Template {
  @PrimaryGeneratedColumn("uuid")
  @Field(type => ID)
  id!: string;

  @Column()
  @Field(type => Int)
  fromHours!: number;

  @Column()
  @Field(type => Int)
  fromMinutes!: number;

  @Column()
  @Field(type => Int)
  toHours!: number;

  @Column()
  @Field(type => Int)
  toMinutes!: number;

  @Column()
  @Field(type => Int)
  weekday!: number;

  @Field(type => Organization)
  @ManyToOne(type => Organization, organization => organization.templates, {
    lazy: true
  })
  organization: Lazy<Organization>;
}
