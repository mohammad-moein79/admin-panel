import bcrypt from "bcryptjs/dist/bcrypt";

export async function hashPassword(password) {
  const newPass = bcrypt.hash(password, 12);

  return newPass;
}
export async function comparePasses(password, passwordHash) {
  const valid = await bcrypt.compare(password, passwordHash);

  return valid;
}
