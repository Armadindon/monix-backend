import path from "path"

const configByDatabaseType = (env) => {
  const databaseType = env('DATABASE_CLIENT', 'sqlite');
  switch(databaseType) {
    case "postgres":
      return {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'monix'),
        user: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', '0000'),
        schema: env('DATABASE_SCHEMA', 'public'), // Not required
        ssl: false
      }
    
    default:
      return {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      }
  }
}

export default ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'sqlite'),
    connection: configByDatabaseType(env),
    debug: false,
  },
});
