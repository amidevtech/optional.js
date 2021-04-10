import { NoSuchElementError } from './errors/no-such-element-error';
import { AppliedFunctionIsNullOrUndefinedError } from './errors/applied-function-is-null-or-undefined.error';
import { AppliedSupplierIsNullOrUndefinedError } from './errors/applied-supplier-is-null-or-undefined.error';
import { AppliedConsumerIsNullOrUndefinedError } from './errors/applied-consmer-is-null-or-undefined.error';
import { AppliedApplyIsNullOrUndefinedError } from './errors/applied-apply-is-null-or-undefined.error';

/**
 * Optional for providing {@code null} and {@code undefined} safety.
 * @author amidev
 */
export class Optional<T> {
    private static readonly EMPTY: Optional<undefined> = new Optional<undefined>(undefined);

    private constructor(private readonly value: T) {}

    private static isEmpty<T>(value: T): boolean {
        return !Optional.isNotEmpty(value);
    }

    private static isNotEmpty<T>(value: T): boolean {
        return value !== null && value !== undefined;
    }

    private static requireNonEmptyValue<T>(value: T): T {
        if (Optional.isEmpty(value)) {
            throw new NoSuchElementError();
        }
        return value;
    }

    private static requireNonEmptySupplier<T>(supplier: () => T): () => T {
        if (supplier === null || supplier === undefined) {
            throw new AppliedSupplierIsNullOrUndefinedError();
        }
        return supplier;
    }

    private static requireNonEmptyConsumer<T>(consumer: (x: T) => void): (x: T) => void {
        if (consumer === null || consumer === undefined) {
            throw new AppliedConsumerIsNullOrUndefinedError();
        }
        return consumer;
    }

    private static requireNonEmptyApply<T>(apply: () => void): () => void {
        if (apply === null || apply === undefined) {
            throw new AppliedApplyIsNullOrUndefinedError();
        }
        return apply;
    }

    private static requireNonEmptyFunction<T, U>(fun: (x: T) => U): (x: T) => U {
        if (fun === null || fun === undefined) {
            throw new AppliedFunctionIsNullOrUndefinedError();
        }
        return fun;
    }

    public static empty<T>(): Optional<T> {
        return Optional.EMPTY;
    }

    public static of<T>(value: T): Optional<T> {
        return new Optional<T>(Optional.requireNonEmptyValue(value));
    }

    public static ofNullable<T>(value: T): Optional<T> {
        return Optional.isNotEmpty(value) ? Optional.of(value) : Optional.empty();
    }

    public get(): T {
        return Optional.requireNonEmptyValue(this.value);
    }

    public orElse(other: T): T {
        return Optional.isNotEmpty(this.value) ? this.value : other;
    }

    public orElseGet(supplier: () => T): T {
        const supplierChecked: () => T = Optional.requireNonEmptySupplier(supplier);
        return Optional.isNotEmpty(this.value) ? this.value : supplierChecked();
    }

    public orElseThrow(): T {
        if (this.isEmpty()) {
            throw new NoSuchElementError();
        }
        return this.value;
    }

    public isEmpty(): boolean {
        return Optional.isEmpty(this.value);
    }

    public isPresent(): boolean {
        return !Optional.isEmpty(this.value);
    }

    public equals(optional: Optional<T>): boolean {
        let equals = false;
        if (this.isEmpty() && optional.isEmpty()) {
            equals = true;
        }
        if (this.isPresent() && optional.isPresent() && this.value === optional.value) {
            equals = true;
        }
        return equals;
    }

    public ifPresent(consumer: (x: T) => void): void {
        const consumerChecked: (x: T) => void = Optional.requireNonEmptyConsumer(consumer);
        if (this.isPresent()) {
            consumerChecked(this.value);
        }
    }

    public ifPresentOrElse(consumerPresent: (x: T) => void, consumerEmpty: () => void): void {
        const consumerPresentChecked: (x: T) => void = Optional.requireNonEmptyConsumer(consumerPresent);
        const consumerEmptyChecked: () => void = Optional.requireNonEmptyApply(consumerEmpty);
        if (this.isPresent()) {
            consumerPresentChecked(this.value);
        } else {
            consumerEmptyChecked();
        }
    }

    public map<U>(fun: (x: T) => U): Optional<U> {
        const funChecked: (x: T) => U = Optional.requireNonEmptyFunction(fun);
        return this.isEmpty() ? Optional.empty() : Optional.of(funChecked(this.value));
    }

    public or(supplier: () => T): Optional<T> {
        const supplierChecked: () => T = Optional.requireNonEmptySupplier(supplier);
        if (this.isPresent()) {
            return this;
        } else {
            return Optional.of(supplierChecked());
        }
    }
}
