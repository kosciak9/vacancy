import {
  Index,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Lazy } from "helpers";

import User from "entities/User";

@Entity()
@ObjectType()
@Index(
  "index_with_dates_and_user",
  (av: Availability) => [av.from, av.to, av.user],
  { unique: true }
) // alternative, type-safe style
export default class Availability {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @Field(() => String)
  from!: string;

  @Column()
  @Field(() => String)
  to!: string;

  @Column()
  @Field(() => Boolean)
  available!: boolean;

  @Column()
  @Field(() => Boolean)
  uncertain!: boolean;

  @Field(() => User)
  @ManyToOne(() => User, { lazy: true })
  user: Lazy<User>;
}
