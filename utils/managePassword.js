import bcrypt from "bcrypt";

export const hashPassword = async (password) => {

    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (e) {
        return console.error(e);
    }
}

export const matchPassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (e) {
        return console.error(e);
    }
}