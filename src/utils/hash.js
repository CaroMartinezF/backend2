import bcrypt from "bcrypt";

export const createHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
};

export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};
