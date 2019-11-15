import { set, setDay, isWeekend } from "date-fns";
import Availability from "entities/Availability";
import User from "entities/User";
import {
  Arg,
  Ctx,
  Query,
  Resolver,
  Field,
  InputType,
  Mutation
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import Template from "entities/Template";

function getHoursFromTemplate(
  date: Date,
  template: Template,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
) {
  const from = setDay(
    set(date, {
      hours: template.fromHours,
      minutes: template.fromMinutes,
      seconds: 0,
      milliseconds: 0
    }),
    template.weekday,
    { weekStartsOn: weekStartsOn }
  );

  const to = setDay(
    set(date, {
      hours: template.toHours,
      minutes: template.toMinutes,
      seconds: 0,
      milliseconds: 0
    }),
    template.weekday,
    { weekStartsOn: weekStartsOn }
  );

  return { from, to };
}

@InputType()
class AddAvailabilityInput implements Partial<Availability> {
  @Field(() => String)
  id?: string;
  @Field(() => String)
  from!: string;
  @Field(() => String)
  to!: string;
  @Field(() => Boolean)
  available: boolean;
  @Field(() => Boolean)
  uncertain: boolean;
}

@Resolver(() => Availability)
export default class AvailabilityResolver {
  constructor(
    @InjectRepository(Availability)
    private readonly availabilityRepository: Repository<Availability>
  ) {}

  @Mutation(() => Availability)
  async addAvailability(
    @Arg("data") newAvailabilityData: AddAvailabilityInput,
    @Ctx() ctx: { user: User }
  ): Promise<Availability> {
    const user = ctx.user;
    const av = this.availabilityRepository.create({
      ...newAvailabilityData,
      user
    });
    this.availabilityRepository.save(av);
    return av;
  }

  @Mutation(() => Availability)
  async changeAvailability(
    @Arg("data") newAvailabilityData: AddAvailabilityInput,
    @Ctx() ctx: { user: User }
  ): Promise<Availability> {
    const user = ctx.user;
    const av = await this.availabilityRepository.findOneOrFail({
      id: newAvailabilityData.id,
      user
    });
    this.availabilityRepository.update(av, { ...newAvailabilityData });
    return av;
  }

  @Query(() => [Availability], { nullable: true })
  async mapped(
    @Ctx() ctx: { user: User },
    @Arg("startDate") startDate: string
  ): Promise<Array<Availability>> {
    const user = ctx.user;
    const organization = await ctx.user.organization;
    const templates = await organization.templates;
    const weekStartsOn = organization.weekStartsOn;

    let date = new Date(startDate);

    const availabilities: Array<Availability> = [];

    for (const template of templates) {
      const { from, to } = getHoursFromTemplate(date, template, weekStartsOn);
      let availability = await this.availabilityRepository.findOne({
        where: {
          from: from.toISOString(),
          to: to.toISOString(),
          user
        }
      });
      if (!availability) {
        availability = this.availabilityRepository.create({
          from: from.toISOString(),
          to: to.toISOString(),
          user,
          available: false,
          uncertain: false
        });
      }
      availabilities.push(availability);
    }

    await this.availabilityRepository.save(availabilities);
    return availabilities;
  }

  @Query(() => [Availability])
  async overview(
    @Ctx() ctx: { user: User },
    @Arg("startDate") startDate: string
  ): Promise<Array<Availability>> {
    const organization = await ctx.user.organization;
    const templates = await organization.templates;
    const weekStartsOn = organization.weekStartsOn;

    let date = new Date(startDate);

    const availabilities = [];

    for (const template of templates) {
      const { from, to } = getHoursFromTemplate(date, template, weekStartsOn);
      (await this.availabilityRepository.find({
        relations: ["user"],
        where: {
          "user.organization": organization,
          from: from.toISOString(),
          to: to.toISOString()
        }
      })).map(av => availabilities.push(av));
    }
    return availabilities;
  }
}
