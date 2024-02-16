import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

require( 'dotenv' ).config();

// Use process.env para acessar suas variáveis de ambiente
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};


export const AppDataSource = new DataSource( {
  type: "postgres",
  host: dbConfig.host,
  port: 5432,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
} )
