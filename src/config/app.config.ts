export const EnvConfiguration = () => ({
  defaultLimit: parseInt(process.env.DEFAULT_LIMIT, 10) || 5,
  environment: process.env.NODE_ENV || 'dev',
  mongo: process.env.MONGODB_URI,
  port: parseInt(process.env.PORT, 10) || 3000,
});
