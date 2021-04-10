export class AppliedSupplierIsNullOrUndefinedError extends Error {
    constructor() {
        super(
            'AppliedSupplierIsNullOrUndefinedError: Applied supplier which was passed to evaluate is null or undefined.'
        );
    }
}
