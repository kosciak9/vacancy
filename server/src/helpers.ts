import { Column, ColumnOptions, getRepository } from "typeorm";

import Organization from "entities/Organization";
import Template from "entities/Template";
import User from "entities/User";

export async function seedDatabase() {
  const userRepository = getRepository(User);
  const templateRepository = getRepository(Template);
  const organizationRepository = getRepository(Organization);

  const defaultUser = userRepository.create({
    name: "Test User",
    locale: "pl",
    email: "test@test.com",
    password: "test"
  });

  await userRepository.save(defaultUser);
  const defaultOrg = organizationRepository.create({
    name: "Test Organization",
    locale: "pl",
    weekStartsOn: 1,
    admin: defaultUser
  });
  await organizationRepository.save(defaultOrg);
  defaultUser.organization = defaultOrg;
  await userRepository.save(defaultUser);
  const templates = templateRepository.create([
    {
      fromHours: 8,
      fromMinutes: 30,
      toHours: 10,
      toMinutes: 0,
      weekday: 1,
      organization: defaultOrg
    }
  ]);
  await templateRepository.save(templates);

  return { defaultUser };
}

export type Lazy<T extends object> = Promise<T> | T;
