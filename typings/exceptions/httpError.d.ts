export declare class HttpError extends Error {
    message: string;
    statusCode: number;
    description: string | undefined;
    constructor(message: string, statusCode: number);
    toString(): string;
}
