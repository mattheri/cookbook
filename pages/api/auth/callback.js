export default async (req, res) => {
    passport.authenticate("google", { failureRedirect: "/" });
    res.redirect("/");
}