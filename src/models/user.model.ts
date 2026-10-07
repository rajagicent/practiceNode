import { prisma } from "../config/prisma.js";
import type {ROLEACCESS} from "../generated/prisma/client.js"

export const userModel = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  create(email: string, passwordHash: string, name:string, role:ROLEACCESS) {
    return prisma.user.create({
      data: { email, passwordHash,  name, role},
      select: { id: true, email: true, name: true, role:true},
    });
  },
};