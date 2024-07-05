import { users } from '../src/libs/constants';
import { prismaClient } from '../prisma/client';

const main = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const user of users) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    // eslint-disable-next-line no-await-in-loop
    await prismaClient.user.create({ data: rest }).catch((e) => console.error(e));
  }
};

main();
