const GoogleStrategy = require('passport-google-oauth20').Strategy



module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: '',
      clientSecret: '',
      callbackURL: `https://anasdev.site/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  )

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((id, done) => done(null, id))
}
