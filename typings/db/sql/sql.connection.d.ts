import mysql from "mysql2/promise";
export declare let db: mysql.Connection;
export declare function connectDb(): Promise<mysql.Connection | void>;
