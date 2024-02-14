import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsersDb = async () => {
  const users = await prisma.user.findMany();
  return users;
};

// export const createUserDb = async (data: User) => {
//   const user = await prisma.user.create({
//     data: {
//       email: 'asdasds',
//       name: 'asdasdas',
//       code: 'Abc',
//       phoneNumber: '890789123123',
//       joinDate: new Date()
//     },

//   });
//   return user
// };
