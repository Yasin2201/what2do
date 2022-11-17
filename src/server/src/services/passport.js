const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");
const { secret } = require("../config");
const db = require("../db");
const { comparePasswords } = require("../utils/password");

// setting local strategy:
const localLogin = new LocalStrategy(
  async (username, password, done) => {
    const user = await db.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });

    if (!user) {
      return done(null, false, { message: "invalid username or password" });
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: "invalid username or password" });
    }

    return done(null, user);
  }
);

// setting the jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  const user = await db.user.findUnique({
    where: {
      id: payload.sub,
    },
  });

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

// tell passport to use defined strategies:
passport.use(jwtLogin);
passport.use(localLogin);