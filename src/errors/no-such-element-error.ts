export class NoSuchElementError extends Error {
    constructor() {
        super('NoSuchElementError: Value is not preset.');
    }
}
