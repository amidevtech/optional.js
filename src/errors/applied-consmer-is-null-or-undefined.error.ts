export class AppliedConsumerIsNullOrUndefinedError extends Error {
    constructor() {
        super(
            'AppliedConsumerIsNullOrUndefinedError: Applied consumer which was passed to evaluate is null or undefined.'
        );
    }
}
