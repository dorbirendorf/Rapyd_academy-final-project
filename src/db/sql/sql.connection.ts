/* eslint-disable import/no-mutable-exports */
import mysql from "mysql2/promise";
import log      from "@ajar/marker";


export let db : mysql.Connection;
export async function connectDb(){
    db = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "qwerty",
        database: "ebank"
      });
      log.magenta(" ✨  Connected to Mysql DB ✨ ");
    };