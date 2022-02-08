import mysql from "mysql2/promise";
import log      from "@ajar/marker";
import config from "../../config.js";

export let db : mysql.Connection;

const{
    DB_HOST="localhost",
    DB_PORT="3306",
    DB_NAME="e_bank",
    DB_USER_NAME="root",
    DB_USER_PASSWORD="qwerty"
} = config;

export async function connectDb():Promise<mysql.Connection | void>{
  if(db) return db;
    db = await mysql.createConnection({
        host: DB_HOST,
        port: Number(DB_PORT),
        user: DB_USER_NAME,
        password:DB_USER_PASSWORD,
        database: DB_NAME
      });
      await db.connect();
      log.magenta(" ✨  Connected to Mysql DB ✨ ");
    }