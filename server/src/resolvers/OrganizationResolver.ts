import { Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import Organization from "entities/Organization";

@Resolver(of => Organization)
export default class OrganizationResolver {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {}

  @Query(returns => [Organization], { nullable: true })
  organizations(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }
}
