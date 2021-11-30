export default class ForbiddenError extends Error {

    constructor(message: string, error?:any) {
        super(message);
    }
}