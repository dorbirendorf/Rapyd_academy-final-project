/* eslint-disable no-console */
// import jwt from "jsonwebtoken";
import uuid from "uuid";
// import { exec } from "child_process";
// import fetch from "node-fetch";

// const {
//     ACCESS_TOKEN_EXPIRATION,
//     REFRESH_TOKEN_EXPIRATION,
//     APP_SECRET,
//     DB_NAME,
// } = process.env;


export function generateID():string{
    // return Math.random().toString(32).slice(2);
    return uuid.v4();
}
export function getTimeString():string {
    const date = new Date();
    return `${date.toDateString()} ${date.toTimeString()}`;
}

// export async function backupDB() {
//         console.log("backing up...");
//         const p = exec(
//             `docker exec mysql-db mysqldump -u root --password=qwerty ${DB_NAME} `
//         );
    
//         fetch("http://localhost:4040/backup", {
//             method: "POST",
//             body: p.stdout,
//         });
// }
    

