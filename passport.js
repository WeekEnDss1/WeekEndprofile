const GoogleStrategy = require('passport-google-oauth20').Strategy



module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: '897974452598-jat413l8f6f03ueol5loe75pgg7bjjb3.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: `https://anasdev.site/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  )

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((id, done) => done(null, id))
}