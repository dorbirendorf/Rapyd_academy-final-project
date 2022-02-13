import { OkPacket, RowDataPacket, ResultSetHeader } from "mysql2";
import { db } from "../db/sql/sql.connection.js"
import logger from "./logger.js";
export type sqlRes = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader

class DbHandler {

    async createMultipleRows(tableName: string, objData: object[]): Promise<sqlRes> {
        try {
            logger.params("createMultipleRows", { tableName, objData });

            const parameters = this.createParametersForInsert(objData[0]);
            const SingleQuestionMarksString = this.createQuestionMarksForInsert(parameters);
            const questionMarks = objData.map(() => `(${SingleQuestionMarksString})`).join(",");
            const splitedValues = this.convertArrayOfArraysToMergedArray(objData.map(obj => Object.values(obj) as string[]))

            const [rows] = await db.query(`INSERT INTO ${tableName} (${parameters})  VALUES ${questionMarks}`, splitedValues);
            logger.funcRet("createMultipleRows", rows);

            return rows;
        } catch (error) {
            logger.error("createMultipleRows", error as Error);
            throw error;
        }
    }

    async updaetRowById(tableName: string, objData: object, objId: object): Promise<sqlRes> {
        try {
            logger.params("updaetRowById", { tableName, objData, objId });

            const setString = this.createSetString(objData)
            const whereString = this.createWhereString(Object.keys(objId)[0], String(Object.values(objId)[0]))
            const [rows] = await db.query(`UPDATE ${tableName} SET ${setString} WHERE ${whereString}`);
            logger.funcRet("updaetRowById", rows);

            return rows;
        } catch (error) {
            logger.error("updaetRowById", error as Error);
            throw error;
        }
    }

    async updateMultipleRowsById(tableName: string, objData: object[], objId: object[]): Promise<sqlRes> {
        try {
            logger.params("updateMultipleRowsById", { tableName, objId, objData });

            const data_name = Object.keys(objData[0])[0];
            let whenStrings = this.createWhenThenString(objData, objId);
            const orString = this.createWhereStringWithOrBetween(objId);
            const [rows] = await db.query(`UPDATE ${tableName} SET ${data_name} = CASE ${whenStrings} END WHERE ${orString}`);
            logger.funcRet("updateMultipleRowsById", rows);

            return rows
        } catch (error) {
            logger.error("updateMultipleRowsById", error as Error);
            throw error;
        }
    }

    async deleteRowById(tableName: string, objId: object): Promise<sqlRes> {
        try {
            logger.params("deleteRowById", { tableName, objId });

            const whereString = this.createWhereString(Object.keys(objId)[0], String(Object.values(objId)[0]))
            const [rows] = await db.query(`DELETE FROM ${tableName} WHERE ${whereString}`);
            logger.funcRet("deleteRowById", rows);

            return rows;
        } catch (error) {
            logger.error("deleteRowById", error as Error);
            throw error;
        }
    }

    async selectRowById(tableName: string, objId: object, columnNames?: string[]): Promise<RowDataPacket[]> {
        try {
            logger.params("selectRowById", { columnNames, objId, tableName });

            const columnString = this.createColumnStringForSelect(columnNames);
            const whereString = this.createWhereString(Object.keys(objId)[0], String(Object.values(objId)[0]))
            console.log(columnString, tableName, whereString)
            const [rows] = await db.query(`SELECT ${columnString} FROM ${tableName} WHERE ${whereString}`);
            logger.funcRet("selectRowById", rows);

            return (rows as RowDataPacket[]);
        } catch (error) {
            logger.error("selectRowById", error as Error);
            throw error;
        }
    }

    async selectRowByIdWithJoin(firstTableName: string, secondTableName: string, objId: object, onFirst: string, onSecond: string, columnNames?: string[]): Promise<RowDataPacket[]> {
        try {
            logger.params("selectRowByIdWithJoin", { firstTableName, secondTableName, columnNames, onFirst, objId, onSecond });
            const columnString = this.createColumnStringForSelect(columnNames);
            const whereString = this.createWhereString(`${firstTableName}.${Object.keys(objId)[0]}`, String(Object.values(objId)[0]))
            const onString = `${firstTableName}.${onFirst}=${secondTableName}.${onSecond}`
            const [rows] = await db.query(`SELECT ${columnString} FROM ${firstTableName} JOIN ${secondTableName} ON ${onString} WHERE ${whereString}`);
            logger.funcRet("selectRowByIdWithJoin", rows);
            return rows as RowDataPacket[];
        } catch (error) {
            logger.error("selectRowByIdWithJoin", error as Error);
            throw error;
        }
    }

    async selectAllRow(tableName: string, columnNames?: string[]): Promise<RowDataPacket[]> {
        try {
            logger.params("selectAllRow", { tableName, columnNames });

            const columnString = this.createColumnStringForSelect(columnNames);
            const [rows] = await db.query(`SELECT ${columnString} FROM ${tableName}`, [columnString, tableName]);
            logger.funcRet("selectAllRow", rows);

            return rows as RowDataPacket[];
        } catch (error) {
            logger.error("selectAllRow", error as Error);
            throw error;
        }
    }

    private createWhenThenString(objData: object[], objId: object[]) {
        try {
            logger.params("createWhenThenString", { objData, objId });
            let whenString: string = "";
            for (let i = 0; i < objData.length; i++) {

                let line: string = ` WHEN ${Object.keys(objId[i])[0]} = ${String(Object.values(objId[i])[0])} THEN ${String(Object.values(objData[i])[0])}`
                whenString = whenString + line;
            }
            logger.funcRet("createWhenThenString", whenString);
            return whenString;
        } catch (error) {
            logger.error("createWhenThenString", error as Error);
            throw error;
        }
    }

    private createSetString(objData: object) {
        try {
            logger.params("createSetString", { objData });

            const setString = Object.entries(objData).map(pair => `${pair[0]} = ${String(pair[1])}`).join(", ");
            logger.funcRet("createSetString", objData);

            return setString;
        } catch (error) {
            logger.error("createSetString", error as Error);
            throw error;
        }
    }

    private createWhereString(key: string, value: string) {
        try {
            logger.params("createWhereString", { key, value });

            const whereString = `${key} = ${value}`;
            logger.funcRet("createWhereString", whereString);

            return whereString;
        } catch (error) {
            logger.error("createWhereString", error as Error);
            throw error;
        }
    }

    private createWhereStringWithOrBetween(objId: object[]) {
        try {
            logger.params("createWhereStringWithOrBetween", { objId });
            const whereString = objId.map(obj => Object.entries(obj)[0]).map(pair => this.createWhereString(pair[0], String(pair[1]))).join(" OR ")
            logger.funcRet("createWhereStringWithOrBetween", whereString);
            return whereString;
        } catch (error) {
            logger.error("createWhereStringWithOrBetween", error as Error);
            throw error;
        }
    }

    private createParametersForInsert(objData: Object) {
        try {
            logger.params("createParametersForInsert", { objData });
            const parametersString = Object.keys(objData).join(",");
            logger.funcRet("createParametersForInsert", parametersString);
            return parametersString;
        } catch (error) {
            logger.error("createParametersForInsert", error as Error);
            throw error;
        }
    }

    private createQuestionMarksForInsert(parameters: string) {
        try {
            logger.params("createQuestionMarksForInsert", { parameters });

            const questionMarks = parameters.split(",").map(() => "?").join(",");
            logger.funcRet("createQuestionMarksForInsert", questionMarks);

            return questionMarks;
        } catch (error) {
            logger.error("createQuestionMarksForInsert", error as Error);
            throw error;
        }
    }

    private createColumnStringForSelect(columnNames?: string[]) {
        try {
            logger.params("createColumnStringForSelect", { columnNames });
            const columnString = columnNames ? columnNames.join(", ") : "*";
            logger.funcRet("createColumnStringForSelect", columnString);
            return columnString;
        } catch (error) {
            logger.error("createColumnStringForSelect", error as Error);
            throw error;
        }
    }

    private convertArrayOfArraysToMergedArray(arr: string[][]) {
        try {
            logger.params("convertArrayOfArraysToMergedArray", { arr });

            const splitedValues = arr.reduce((prev, curr) => {
                curr.forEach(value => prev.push(value))
                return prev;
            }, [])
            logger.funcRet("convertArrayOfArraysToMergedArray", splitedValues);

            return splitedValues;
        } catch (error) {
            logger.error("convertArrayOfArraysToMergedArray", error as Error);
            throw error;
        }
    }
}


const dbHandler = new DbHandler()
export default dbHandler;
