export const sessionOptions = {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "farmcars_session",
    cookieOptions: {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60,

    }
}
