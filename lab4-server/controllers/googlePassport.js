const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const {User} = require('../models/models'); 

passport.use(new GoogleTokenStrategy({
  clientID: '1038344380648-5ukb448ke1qfarkkf4nd925bk7sm16pj.apps.googleusercontent.com',
  clientSecret: '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',
}, async (accessToken, refreshToken, profile, done) => {
  try {

    console.log(098765432);

    let user = await User.findOne({ googleid: profile.id });

    if (!user) {
      user = await User.create({
        googleid: profile.id,
        email: profile.emails[0].value,
        role: 'ADMIN',
        password: 'googleAuth'
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, false, { message: 'Google auth error' });
  }
}));

module.exports = passport;
