/* eslint-disable no-console */
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";

export const superAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: process.env.SUPER_ADMIN_EMAIL,
    });

    if (!isSuperAdminExist) {
      const hashPassword = await bcrypt.hash(
        process.env.SUPER_ADMIN_PASSWORD as string,
        10,
      );
      const superAdmin = await User.create({
        name: "Super Admin",
        email: process.env.SUPER_ADMIN_EMAIL,
        password: hashPassword,
        role: "SUPER_ADMIN",
        isActive: "ACTIVE",
        isVerified: true,
        auths: [
          { provider: "Credential", providerId: process.env.SUPER_ADMIN_EMAIL },
        ],
      });
      return superAdmin;
    }
  } catch (err) {
    console.log(err);
  }
};
