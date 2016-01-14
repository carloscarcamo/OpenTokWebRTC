var config = {}

config.opentok = {};
config.web = {};

// OpenTok Credentials
config.opentok.key = process.env.TB_KEY || '45457282';
config.opentok.secret=  process.env.TB_SECRET || 'f4abeccaee09ace2fac0408c1dbc6c74c7aebcad';


config.web.port = process.env.PORT || 3000;
config.web.env = process.env.NODE_ENV || "development"; // environment, change to production

module.exports = config;
