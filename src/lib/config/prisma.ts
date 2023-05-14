//import { PrismaClient } from '@prisma/client';
//https://github.com/prisma/prisma/issues/4816 handles docker error
import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

export default prisma;
