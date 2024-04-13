import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const userOnePassword = await bcrypt.hash('useronepassword', 10);
  const userOne = await prisma.user.create({
    data: {
      email: 'user_one@domain.com',
      password: userOnePassword,
      name: 'User One',
    },
  });

  const userTwoPassword = await bcrypt.hash('usertwopassword', 10);
  const userTwo = await prisma.user.create({
    data: {
      email: 'user_two@domain.com',
      password: userTwoPassword,
      name: 'User Two',
    },
  });

  const dueDate1 = new Date();
  const data1 = {
    vendor_name: 'Vendor 1',
    amount: 70,
    description: 'Invoice for Vendor 1',
    due_date: dueDate1,
    paid: false,
    user_id: userOne.id,
  };
  dueDate1.setDate(dueDate1.getDate() + 7);
  await prisma.invoice.createMany({
    data: [data1, data1, data1, data1, data1],
  });

  const dueDate2 = new Date();
  dueDate2.setDate(dueDate2.getDate() + 3);
  const data2 = {
    vendor_name: 'Vendor 2',
    amount: 120,
    description: 'Invoice for Vendor 2',
    due_date: dueDate2,
    paid: true,
    user_id: userOne.id,
  };
  await prisma.invoice.createMany({
    data: [data2, data2, data2, data2, data2],
  });

  const dueDate3 = new Date();
  const data3 = {
    vendor_name: 'Vendor 3',
    amount: 16,
    description: 'Invoice for Vendor 3',
    due_date: dueDate3,
    paid: false,
    user_id: userOne.id,
  };
  dueDate3.setDate(dueDate3.getDate() + 19);
  await prisma.invoice.createMany({
    data: [data3, data3, data3, data3, data3],
  });

  const dueDate4 = new Date();
  dueDate4.setDate(dueDate4.getDate() + 1);
  await prisma.invoice.create({
    data: {
      vendor_name: 'Vendor 4',
      amount: 89,
      description: 'Invoice for Vendor 4',
      due_date: dueDate4,
      paid: true,
      user_id: userTwo.id,
    },
  });

  const dueDate5 = new Date();
  dueDate5.setDate(dueDate5.getDate() + 12);
  await prisma.invoice.createMany({
    data: {
      vendor_name: 'Vendor 1',
      amount: 100,
      description: 'Invoice for Vendor 1',
      due_date: dueDate5,
      paid: false,
      user_id: userTwo.id,
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
