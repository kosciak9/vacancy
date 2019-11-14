import {
  Field,
  Int,
  InputType,
  Query,
  Resolver,
  Ctx,
  Mutation,
  Arg
} from "type-graphql";
import Template from "entities/Template";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import User from "entities/User";

@InputType()
class AddTemplateInput implements Partial<Template> {
  @Field(type => String)
  from!: string;
  @Field(type => String)
  to!: string;
  @Field(type => Int)
  weekday!: number;
}

@Resolver(of => Template)
export default class TemplateResolver {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>
  ) {}

  @Query(returns => [Template], { nullable: true })
  async templates(@Ctx() ctx: { user: User }): Promise<Template[]> {
    return this.templateRepository.find({
      relations: ["organization"],
      where: { organization: await ctx.user.organization }
    });
  }

  @Mutation(returns => Template)
  async addTemplate(
    @Arg("data") newTemplateData: AddTemplateInput,
    @Ctx() ctx: { user: User }
  ): Promise<Template | null> {
    const organization = await ctx.user.organization;
    if (organization.admin.id === ctx.user.id) {
      const template = this.templateRepository.create({
        ...newTemplateData,
        organization
      });
      this.templateRepository.save(template);

      return template;
    } else {
      return null;
    }
  }
}
