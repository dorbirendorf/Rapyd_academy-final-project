import { OkPacket, RowDataPacket, ResultSetHeader} from "mysql2";
import {db} from "./db/sql/sql.connection.js";
type sqlRes = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader

export async function createRow(tableName:string,objData: object) :Promise<sqlRes> {
    const parameters = Object.keys(objData).join(",");
    const questionMarks = parameters.split(",").map(() => "?").join(",");
    const [rows] = await db.query("INSERT INTO "+ tableName+" ("+parameters+")  VALUES ("+questionMarks+")",Object.values(objData));
    return rows;
}

export async function updaetRowById(tableName:string,objData: object, objId:object):Promise<sqlRes> {
    const setString = Object.entries(objData).map(pair=> pair[0] + " = " + pair[1]).join(", ");
    const whereString = Object.keys(objId)[0] + " = " +Object.values(objId)[0];
    const [rows] = await db.query("UPDATE "+ tableName+" SET "+setString+" WHERE " + whereString);
    return rows;
}

export async function deleteRowById(tableName:string, objId:object):Promise<sqlRes> {
    const whereString = Object.keys(objId)[0] + " = " +Object.values(objId)[0];
    const [rows] = await db.query("DELETE FROM "+ tableName+" WHERE " + whereString);
    return rows;
}

export async function selectRowById(tableName:string, objId:object, columnNames?:string[]):Promise<sqlRes>{
    const columnString = columnNames? columnNames.join(", ") :"*";
    const whereString = Object.keys(objId)[0] + " = " +Object.values(objId)[0];
    const [rows] = await db.query("SELECT "+ columnString + " FROM "+ tableName+" WHERE " + whereString);
    return rows;
}

export async function selectRowByIdWithJoin(firstTableName:string,secondTableName:string, objId:object, onFirst:string, onSecond:string, columnNames?:string[]):Promise<sqlRes>{
    const columnString = columnNames? columnNames.join(", ") :"*";
    const whereString = firstTableName+"."+ Object.keys(objId)[0] + " = " +Object.values(objId)[0];
    const onString = `${firstTableName}.${onFirst}=${secondTableName}.${onSecond}`
    const [rows] = await db.query("SELECT "+ columnString + " FROM "+ firstTableName+" JOIN "+secondTableName+" ON "+ onString +" WHERE " + whereString);
    return rows;
}

export async function selectAllRow(tableName:string, columnNames?:string[]):Promise<sqlRes>{
    const columnString = columnNames? columnNames.join(", ") :"*";
    const [rows] = await db.query("SELECT "+ columnString + " FROM "+ tableName);
    return rows;
}

export async function selectRowsPagination(tableName:string,pagination: number, limit: number, columnNames?:string[]):Promise<sqlRes> {
    const columnString = columnNames? columnNames.join(", ") :"*";
    pagination = pagination > 0 ? ((pagination - 1) * limit) : 0;
    const [rows] = await db.query("SELECT "+ columnString + " FROM " + tableName +" LIMIT "+ pagination+ "," + limit);
    return rows;
}



