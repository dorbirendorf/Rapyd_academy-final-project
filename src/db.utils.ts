import { OkPacket, RowDataPacket, ResultSetHeader} from "mysql2";
import {db} from "./db/sql/sql.connection.js";
import logger from "./utils/logger.js";
export type sqlRes = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader

export async function createRow(tableName:string,objData: object) :Promise<sqlRes> {
   try {    logger.params("createRow",{tableName,objData});

       const parameters = Object.keys(objData).join(",");
    const questionMarks = parameters.split(",").map(() => "?").join(",");
    const [rows] = await db.query("INSERT INTO "+ tableName+" ("+parameters+")  VALUES ("+questionMarks+")",Object.values(objData));
    logger.funcRet("createRow",rows);
    return rows;}catch (error) {
        logger.error("createRow", error as Error);
       throw error;
    }
}

export async function createMultipleRows(tableName:string,objData: object[]) :Promise<sqlRes> {
    try{        logger.params("createMultipleRows", {tableName,objData});

        const parameters = Object.keys(objData[0]).join(",");
    const questionMarks = objData.map(()=>`(${parameters.split(",").map(() => "?").join(",")})`).join(",");
    let splitedValues = objData.map(obj=> Object.values(obj)).
    reduce((prev,curr) => {
        prev.push(curr);
        return prev as string[];
    },[])
    console.log("INSERT INTO "+ tableName+" ("+parameters+")  VALUES ("+questionMarks+")",splitedValues)
    const [rows] = await db.query("INSERT INTO "+ tableName+" ("+parameters+")  VALUES ("+questionMarks+")",splitedValues);
    logger.funcRet("createMultipleRows", rows);

    return rows;}catch (error) {
        logger.error("createMultipleRows", error as Error);
       throw error;
    }
}

export async function updaetRowById(tableName:string,objData: object, objId:object):Promise<sqlRes> {
    try{        logger.params("updaetRowById", {tableName,objData,objId});

        const setString = Object.entries(objData).map(pair=> pair[0] + " = " + pair[1]).join(", ");
    const whereString = `${Object.keys(objId)[0]} = "${Object.values(objId)[0]}"`;
    const [rows] = await db.query("UPDATE "+ tableName+" SET "+setString+" WHERE " + whereString);
    logger.funcRet("updaetRowById", rows);

    return rows;}catch (error) {
        logger.error("updaetRowById", error as Error);
       throw error;
    }
}

export async function updateMultipleRowsById(tableName:string,objData:object[],objId:object[]):Promise<sqlRes> {
   try{        logger.params("updateMultipleRowsById",{ tableName,objId,objData});

        const data_name = Object.keys(objData[0])[0];
    let whenStrings:string = "";
    for (let i = 0; i < objData.length;i++){
        let line:string = " WHEN " + Object.keys(objId[i])[0] +" = " + Object.values(objId[i])[0] + " THEN "+ Object.values(objData[i])[0]
        whenStrings = whenStrings + line;
    }
    const orString = objId.map(obj => Object.entries(obj)[0]).map(pair => pair[0].toString() + " = " + pair[1].toString()).join(" OR ")
    console.log("UPDATE "+ tableName+" SET "+data_name+" = CASE "+whenStrings+" END WHERE " + orString)
    const [rows] = await db.query("UPDATE "+ tableName+" SET "+data_name+" = CASE "+whenStrings+" END WHERE " + orString);
    console.log(rows)
    logger.funcRet("updateMultipleRowsById", rows);

    return rows
    }catch (error) {
        logger.error("updateMultipleRowsById", error as Error);
       throw error;
    }
}



export async function deleteRowById(tableName:string, objId:object):Promise<sqlRes> {
    try{        logger.params("deleteRowById", {tableName,objId});

        const whereString = `${Object.keys(objId)[0]} = "${Object.values(objId)[0]}"`;
    const [rows] = await db.query("DELETE FROM "+ tableName+" WHERE " + whereString);
    logger.funcRet("deleteRowById",rows);

    return rows;}catch (error) {
        logger.error("deleteRowById", error as Error);
       throw error;
    }
}

export async function selectRowById(tableName:string, objId:object, columnNames?:string[]):Promise<RowDataPacket[]>{
    try{        logger.params("selectRowById",{columnNames,objId,tableName});

        const columnString = columnNames? columnNames.join(", ") :"*";
    const whereString = `${Object.keys(objId)[0]} = "${Object.values(objId)[0]}"`;
    const [rows] = await db.query("SELECT "+ columnString + " FROM "+ tableName+" WHERE " + whereString);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    logger.funcRet("selectRowById", rows);

    return (rows as RowDataPacket[]);}catch (error) {
        logger.error("selectRowById", error as Error);
       throw error;
    }
}

export async function selectRowByIdWithJoin(firstTableName:string,secondTableName:string, objId:object, onFirst:string, onSecond:string, columnNames?:string[]):Promise<RowDataPacket[]>{
    try{logger.params("selectRowByIdWithJoin", {firstTableName,secondTableName,columnNames,onFirst,objId,onSecond});
        const columnString = columnNames? columnNames.join(", ") :"*";
    const whereString = `${firstTableName}.${Object.keys(objId)[0]} = "${Object.values(objId)[0]}"`;
    const onString = `${firstTableName}.${onFirst}=${secondTableName}.${onSecond}`
    const [rows] = await db.query("SELECT "+ columnString + " FROM "+ firstTableName+" JOIN "+secondTableName+" ON "+ onString +" WHERE " + whereString);
    logger.funcRet("selectRowByIdWithJoin", rows);
    return rows as RowDataPacket[];}catch (error) {
        logger.error("selectRowByIdWithJoin", error as Error);
       throw error;
    }
}

export async function selectAllRow(tableName:string, columnNames?:string[]):Promise<RowDataPacket[]>{
   try {    logger.params("selectAllRow",{tableName,columnNames});

       const columnString = columnNames? columnNames.join(", ") :"*";
    const [rows] = await db.query("SELECT "+ columnString + " FROM "+ tableName);
    logger.funcRet("selectAllRow", rows);

    return rows as RowDataPacket[];
}catch (error) {
    logger.error("selectAllRow", error as Error);
   throw error;
}}

export async function selectRowsPagination(tableName:string,pagination: number, limit: number, columnNames?:string[]):Promise<RowDataPacket[]> {
    try{        logger.params("selectRowsPagination", {tableName,pagination,limit,columnNames});

        const columnString = columnNames? columnNames.join(", ") :"*";
    pagination = pagination > 0 ? ((pagination - 1) * limit) : 0;
    const [rows] = await db.query("SELECT "+ columnString + " FROM " + tableName +" LIMIT "+ pagination+ "," + limit);
    logger.funcRet("selectRowsPagination", rows);

    return rows as RowDataPacket[];}catch (error) {
        logger.error("selectRowsPagination", error as Error);
       throw error;
    }
}



