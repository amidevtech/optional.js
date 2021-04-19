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
     * @returns {@link Supplier}, if it's not {@code null} or {@code undefined}.
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
     * @returns {@link Consumer}, if it's not {@code null} or {@code undefined}.
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
     * @returns {@link Apply}, if it's not {@code null} or {@code undefined}.
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
     * @returns {@Link Predicate}, if it's not {@code null} or {@code undefined}.
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
     * @returns {@link MonoFunction}, if it's not {@code null} or {@code undefined}.
     * @throws AppliedFunctionIsNullOrUndefinedError if supplier is {@code null} or {@code undefined}.
     */
    private static requireNonEmptyFunction<T, U>(fun: MonoFunction<T, U>): MonoFunction<T, U> {
        if (fun === null || fun === undefined) {
            throw new AppliedFunctionIsNullOrUndefinedError();
        }
        return fun;
    }

    /**
     * Returns empty optional.
     * Represents empty value, when {@code value} is {@code null} or {@code undefined}.
     * @returns Optional with empty value.
     */
    public static empty<T>(): Optional<T> {
        return Optional.EMPTY;
    }

    /**
     * Creates optional from not empty value. When {@code value} is not {@code null} or {@code undefined}.
     * @param value Passed not empty value.
     * @returns Optional with value not empty value.
     * @throws NoSuchElementError if value {@code value} is {@code null} or {@code undefined}.
     */
    public static of<T>(value: T): Optional<T> {
        return new Optional<T>(Optional.requireNonEmptyValue(value));
    }

    /**
     * Creates optional from passed value, no mather what is it.
     * In this case {@code value} could be {@code null} or {@code undefined}.
     * @param value Passed value, could be empty.
     * @returns Optional with passed value. If {@code value} is {@code null} or {@code undefined} teh {@link Optional.empty}
     * is returned.
     */
    public static ofNullable<T>(value: T): Optional<T> {
        return Optional.isNotEmpty(value) ? Optional.of(value) : Optional.empty();
    }

    /**
     * Returns value of {@link Optional}.
     * @returns Value, if present.
     * @throws NoSuchElementError Error occurred when, {@link Optional.get} is
     * called on {@link Optional#empty}.
     */
    public get(): T {
        return Optional.requireNonEmptyValue(this.value);
    }

    /**
     * Returns {@code value} of {@link Optional}, or if {@code value} is not present {@code other}
     * @param other Value to be returned if {@code value} is {@code null} or {@code undefined}.
     * @returns {@code value} of optional or if empty {@code other}
     * @throws AppliedSupplierIsNullOrUndefinedError Error occurred when, {@code supplier} is {@code null} or {@code undefined}
     */
    public orElse(other: T): T {
        return Optional.isNotEmpty(this.value) ? this.value : other;
    }

    /**
     * Returns {@code value} of {@link Optional}, or apply {@link Supplier} if empty.
     * @param supplier Supplier to be returned if {@code value} is {@code null} or {@code undefined}.
     * @returns {@code value} of optional or if empty {@code supplier} is applied.
     */
    public orElseGet(supplier: Supplier<T>): T {
        const supplierChecked: Supplier<T> = Optional.requireNonEmptySupplier(supplier);
        return Optional.isNotEmpty(this.value) ? this.value : supplierChecked();
    }

    /**
     * Returns {@code value} of {@link Optional}, or throw {@link NoSuchElementError} if empty.
     * @returns {@code value} of optional or if empty {@link NoSuchElementError} is throw.
     * @throws NoSuchElementError Error occurred when, {@code code} is {@code null} or {@code undefined}
     */
    public orElseThrow(): T {
        if (this.isEmpty()) {
            throw new NoSuchElementError();
        }
        return this.value;
    }

    /**
     * Check if {@code value} is empty.
     * @returns True, if {@code value} is {@code null} or {@code undefined}.
     */
    public isEmpty(): boolean {
        return Optional.isEmpty(this.value);
    }

    /**
     * Check if {@code value} is present.
     * @returns True, if {@code value} is not {@code null} or {@code undefined}.
     */
    public isPresent(): boolean {
        return !Optional.isEmpty(this.value);
    }

    /**
     * Compares with passed {@code optional}.
     * @param optional Optional to compare.
     * @returns True, if both values are present and value is the same, or both are empty.
     */
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

    /**
     * Apply consumer function {@link Consumer} on {@code value} if present.
     * @throws AppliedConsumerIsNullOrUndefinedError Error occurred when,
     * {@code consumer} is {@code null} or {@code undefined}.
     */
    public ifPresent(consumer: Consumer<T>): void {
        const consumerChecked: (x: T) => void = Optional.requireNonEmptyConsumer(consumer);
        if (this.isPresent()) {
            consumerChecked(this.value);
        }
    }

    /**
     * Apply consumer function {@link Consumer} on {@code value} if present,
     * when empty apply {@link Apply}
     * @throws AppliedConsumerIsNullOrUndefinedError Error occurred when,
     * {@code consumerPresent} is {@code null} or {@code undefined}.
     * @throws AppliedApplyIsNullOrUndefinedError Error occurred when,
     * {@code applyEmpty} is {@code null} or {@code undefined}.
     */
    public ifPresentOrElse(consumerPresent: Consumer<T>, applyEmpty: Apply): void {
        const consumerPresentChecked: (x: T) => void = Optional.requireNonEmptyConsumer(consumerPresent);
        const consumerEmptyChecked: () => void = Optional.requireNonEmptyApply(applyEmpty);
        if (this.isPresent()) {
            consumerPresentChecked(this.value);
        } else {
            consumerEmptyChecked();
        }
    }

    /**
     * Map {@link Optional<T>} into {@link Optional<U>} with {@link MonoFunction} {@code T -> U} if value exists,
     * else return empty as it was.
     * @param fun Mono function which transform {@code T -> U}
     * @returns Optional of new type which was transformed using {@link MonoFunction}
     * @throws AppliedFunctionIsNullOrUndefinedError Error occurred when,
     * {@code fun} is {@code null} or {@code undefined}.
     */
    public map<U>(fun: MonoFunction<T, U>): Optional<U> {
        const funChecked: (x: T) => U = Optional.requireNonEmptyFunction(fun);
        return this.isEmpty() ? Optional.empty() : Optional.of(funChecked(this.value));
    }

    /**
     * Function return {@link Optional} if {@code value} is not {@code null} or {@code undefined},
     * in other case it apply given {@code supplier} and returns {@link Optional} with it's value.
     * @param supplier Supplier to apply.
     * @returns Optional with value if exists, if not - {@link Optional} from {@code supplier}
     * @throws AppliedSupplierIsNullOrUndefinedError Error occurred when,
     * {@code supplier} is {@code null} or {@code undefined}.
     */
    public or(supplier: Supplier<T>): Optional<T> {
        const supplierChecked: () => T = Optional.requireNonEmptySupplier(supplier);
        if (this.isPresent()) {
            return this;
        } else {
            return Optional.of(supplierChecked());
        }
    }

    /**
     * Function return {@link Optional} with {@code value} if {@link predicate} on {@code value} is {@code True}
     * in other case it returns {@link Optional.empty}
     * @param predicate Predicate to check against {@code value}.
     * @returns Optional with value if {@code predicate} is {@code True}, if not - {@link Optional.empty}
     * @throws AppliedPredicateIsNullOrUndefinedError Error occurred when,
     * {@code predicate} is {@code null} or {@code undefined}.
     */
    public filter(predicate: Predicate<T>): Optional<T> {
        const predicateChecked: (x: T) => boolean = Optional.requireNonEmptyPredicate(predicate);
        if (this.isEmpty()) {
            return Optional.empty();
        }
        return predicateChecked(this.value) ? this : Optional.empty();
    }
}
