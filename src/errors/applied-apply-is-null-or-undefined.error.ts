export class AppliedApplyIsNullOrUndefinedError extends Error {
    constructor() {
        super('AppliedApplyIsNullOrUndefinedError: Applied apply which was passed to evaluate is null or undefined.');
    }
}
