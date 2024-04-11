import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('useronepassword', 10);
  await prisma.user.create({
    data: {
      email: 'user_one@domain.com',
      password: password,
      name: 'User One',
    },
  });
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
