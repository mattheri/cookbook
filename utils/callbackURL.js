export const callbackURL = () => {
    const dev = process.env.NODE_ENV !== "production";

    if (dev) {
        return process.env.DEV_URL
    }

    return process.env.PROD_URL
}