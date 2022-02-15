export class HttpError extends Error {
    public description: string | undefined;
    constructor(public message: string, public statusCode: number) {
        super(message);
    }
    toString(): string {
        return `Status code: ${this.statusCode}, Message: ${this.message}
            Stack: ${this.stack as string}
            `;
    }
}
