export class AppliedPredicateIsNullOrUndefinedError extends Error {
    constructor() {
        super(
            'AppliedPredicateIsNullOrUndefinedError: Applied predicate which was passed to evaluate is null or undefined.'
        );
    }
}
