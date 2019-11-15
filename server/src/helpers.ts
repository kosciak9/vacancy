import { getRepository } from "typeorm";

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
  const templates = [];
  let fromHours = 8;
  let fromMinutes = 30;
  let toHours = 10;
  let toMinutes = 0;
  for (let weekday = 1; weekday < 8; weekday++) {
    fromHours = 8;
    fromMinutes = 30;
    toHours = 10;
    toMinutes = 0;
    for (let i = 0; i < 10; i++) {
      const t = templateRepository.create({
        fromHours,
        fromMinutes,
        toHours,
        toMinutes,
        weekday,
        organization: defaultOrg
      });
      templates.push(t);
      // iterator: 1h30min
      fromMinutes = (fromMinutes + 30) % 60;
      fromHours += fromMinutes === 0 ? 2 : 1;
      toMinutes = (toMinutes + 30) % 60;
      toHours += toMinutes === 0 ? 2 : 1;
    }
  }
  templateRepository.create(templates);
  await templateRepository.save(templates);

  return { defaultUser };
}

export type Lazy<T extends object> = Promise<T> | T;
