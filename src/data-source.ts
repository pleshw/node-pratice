import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import dotenv from 'dotenv';

dotenv.config();

// Use process.env para acessar suas variáveis de ambiente
const dbConfig = {
    type: process.env.DB_TYPE as "postgres",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};


export const AppDataSource = new DataSource( {
    type: dbConfig.type,
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
