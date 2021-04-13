import { NoSuchElementError } from './errors/no-such-element-error';
import { AppliedFunctionIsNullOrUndefinedError } from './errors/applied-function-is-null-or-undefined.error';
import { AppliedSupplierIsNullOrUndefinedError } from './errors/applied-supplier-is-null-or-undefined.error';
import { AppliedConsumerIsNullOrUndefinedError } from './errors/applied-consmer-is-null-or-undefined.error';
import { AppliedApplyIsNullOrUndefinedError } from './errors/applied-apply-is-null-or-undefined.error';
import { AppliedPredicateIsNullOrUndefinedError } from './errors/applied-predicate-is-null-or-undefined.error';
import { Predicate } from './functions/predicate';
import { Supplier } from './functions/supplier';
import { Apply } from './functions/apply';
import { MonoFunction } from './functions/function';
import { Consumer } from './functions/consumer';

/**
 * Optional for providing {@code null} and {@code undefined} safety.
 * @author amidev
 */
export class Optional<T> {
    /** Field responsible for empty value. It's returned each time if optional has not value. */
    private static readonly EMPTY: Optional<undefined> = new Optional<undefined>(undefined);

    /**
     * Constructor to create new instance of {@link Optional}.
     * Constructor is private to prevent creating new objects with it,
     * to produce new {@link Optional} use {@link of} or {@link ofNullable}
     * @param value Value which {@link Optional} is created.
     * @private
     */
    private constructor(private readonly value: T) {}

    /**
     * Util method used to check if {@code value} not {@code null} or {@code undefined}
     * @param value Value to check.
     * @private
     * @returns True, if value is {@code null} or {@code undefined}.
     */
    private static isEmpty<T>(value: T): boolean {
        return !Optional.isNotEmpty(value);
    }

    /**
     * Util method used to check if {@code value} is not {@code null} or {@code undefined}
     * @param value Value to check.
     * @private
     * @returns True, if value is not {@code null} or {@code undefined}.
     */
    private static isNotEmpty<T>(value: T): boolean {
        return value !== null && value !== undefined;
    }

    /**
     * Util method to validate and return {@code value} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param value Value to check.
     * @private
     * @returns {@code value}, if it's not {@code null} or {@code undefined}.
     * @throws NoSuchElementError if value is not present.
     */
    private static requireNonEmptyValue<T>(value: T): T {
        if (Optional.isEmpty(value)) {
            throw new NoSuchElementError();
        }
        return value;
    }

    /**
     * Util method to validate and return {@code supplier} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param supplier Supplier to check.
     * @private
     * @returns {@code supplier}, if it's not {@code null} or {@code undefined}.
     * @throws AppliedSupplierIsNullOrUndefinedError if supplier is {@code null} or {@code undefined}.
     */
    private static requireNonEmptySupplier<T>(supplier: Supplier<T>): Supplier<T> {
        if (supplier === null || supplier === undefined) {
            throw new AppliedSupplierIsNullOrUndefinedError();
        }
        return supplier;
    }

    /**
     * Util method to validate and return {@code consumer} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param consumer Consumer to check.
     * @private
     * @returns {@code consumer}, if it's not {@code null} or {@code undefined}.
     * @throws AppliedConsumerIsNullOrUndefinedError if supplier is {@code null} or {@code undefined}.
     */
    private static requireNonEmptyConsumer<T>(consumer: (x: T) => void): (x: T) => void {
        if (consumer === null || consumer === undefined) {
            throw new AppliedConsumerIsNullOrUndefinedError();
        }
        return consumer;
    }

    /**
     * Util method to validate and return {@code apply} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param apply Apply to check.
     * @private
     * @returns {@code apply}, if it's not {@code null} or {@code undefined}.
     * @throws AppliedApplyIsNullOrUndefinedError if supplier is {@code null} or {@code undefined}.
     */
    private static requireNonEmptyApply<T>(apply: Apply): Apply {
        if (apply === null || apply === undefined) {
            throw new AppliedApplyIsNullOrUndefinedError();
        }
        return apply;
    }

    /**
     * Util method to validate and return {@code predicate} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param predicate Predicate to check.
     * @private
     * @returns {@code predicate}, if it's not {@code null} or {@code undefined}.
     * @throws AppliedPredicateIsNullOrUndefinedError if supplier is {@code null} or {@code undefined}.
     */
    private static requireNonEmptyPredicate<T>(predicate: Predicate<T>): Predicate<T> {
        if (predicate === null || predicate === undefined) {
            throw new AppliedPredicateIsNullOrUndefinedError();
        }
        return predicate;
    }

    /**
     * Util method to validate and return {@code function} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param fun Function to check.
     * @private
     * @returns {@code fun}, if it's not {@code null} or {@code undefined}.
     * @throws AppliedFunctionIsNullOrUndefinedError if supplier is {@code null} or {@code undefined}.
     */
    private static requireNonEmptyFunction<T, U>(fun: MonoFunction<T, U>): MonoFunction<T, U> {
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

    public orElseGet(supplier: Supplier<T>): T {
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

    public ifPresent(consumer: Consumer<T>): void {
        const consumerChecked: (x: T) => void = Optional.requireNonEmptyConsumer(consumer);
        if (this.isPresent()) {
            consumerChecked(this.value);
        }
    }

    public ifPresentOrElse(consumerPresent: Consumer<T>, applyEmpty: Apply): void {
        const consumerPresentChecked: (x: T) => void = Optional.requireNonEmptyConsumer(consumerPresent);
        const consumerEmptyChecked: () => void = Optional.requireNonEmptyApply(applyEmpty);
        if (this.isPresent()) {
            consumerPresentChecked(this.value);
        } else {
            consumerEmptyChecked();
        }
    }

    public map<U>(fun: MonoFunction<T, U>): Optional<U> {
        const funChecked: (x: T) => U = Optional.requireNonEmptyFunction(fun);
        return this.isEmpty() ? Optional.empty() : Optional.of(funChecked(this.value));
    }

    public or(supplier: Supplier<T>): Optional<T> {
        const supplierChecked: () => T = Optional.requireNonEmptySupplier(supplier);
        if (this.isPresent()) {
            return this;
        } else {
            return Optional.of(supplierChecked());
        }
    }

    public filter(predicate: Predicate<T>): Optional<T> {
        const predicateChecked: (x: T) => boolean = Optional.requireNonEmptyPredicate(predicate);
        if (this.isEmpty()) {
            return Optional.empty();
        }
        return predicateChecked(this.value) ? this : Optional.empty();
    }
}
