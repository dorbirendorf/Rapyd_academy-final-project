export class InformativeError extends Error {
    constructor(public message: string, public description?: string) {
        super(message);
    }
}
