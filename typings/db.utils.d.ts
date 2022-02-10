import { OkPacket, RowDataPacket, ResultSetHeader } from "mysql2";
export declare type sqlRes = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;
export declare function createRow(tableName: string, objData: object): Promise<sqlRes>;
export declare function updaetRowById(tableName: string, objData: object, objId: object): Promise<sqlRes>;
export declare function deleteRowById(tableName: string, objId: object): Promise<sqlRes>;
export declare function selectRowById(tableName: string, objId: object, columnNames?: string[]): Promise<any>;
export declare function selectRowByIdWithJoin(firstTableName: string, secondTableName: string, objId: object, onFirst: string, onSecond: string, columnNames?: string[]): Promise<sqlRes>;
export declare function selectAllRow(tableName: string, columnNames?: string[]): Promise<sqlRes>;
export declare function selectRowsPagination(tableName: string, pagination: number, limit: number, columnNames?: string[]): Promise<sqlRes>;