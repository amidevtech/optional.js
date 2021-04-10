export class AppliedFunctionIsNullOrUndefinedError extends Error {
    constructor() {
        super(
            'AppliedFunctionIsNullOrUndefinedError: Applied function which was passed to evaluate is null or undefined.'
        );
    }
}
