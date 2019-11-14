import AvailabilityResolver from "./AvailabilityResolver";
import OrganizationResolver from "resolvers/OrganizationResolver";
import TemplateResolver from "resolvers/TemplateResolver";
import UserResolver from "./UserResolver";

const resolvers = [
  AvailabilityResolver,
  OrganizationResolver,
  TemplateResolver,
  UserResolver
];

export default resolvers;
