import { Predicate } from '../functions/predicate';
import { Supplier } from '../functions/supplier';
import { Apply } from '../functions/apply';
import { MonoFunction } from '../functions/function';
import { Consumer } from '../functions/consumer';
import { RequireUtilityFunctions } from '../functions/require-utility-functions';

/**
 * Optional for providing {@code null} and {@code undefined}, called together as {@code nullish}, safety.
 * @author amidevtech
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
    protected constructor(private readonly value: T) {}

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
    private static isNotEmpty<T>(value: T | null | undefined): boolean {
        return value !== null && value !== undefined;
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
        return new Optional<T>(RequireUtilityFunctions.requireNonEmptyValue(value));
    }

    /**
     * Creates optional from passed value, no mather what is it.
     * In this case {@code value} could be {@code null} or {@code undefined}.
     * @param value Passed value, could be empty.
     * @returns Optional with passed value. If {@code value} is {@code null} or {@code undefined} teh {@link Optional.empty}
     * is returned.
     */
    public static ofNullable<T>(value: T | null | undefined): Optional<T> {
        return Optional.ofNullish(value);
    }

    /**
     * Creates optional from passed promise with value, no mather what is it.
     * In this case {@code value} could be {@code nullish}, what means {@code null} or {@code undefined}.
     * @param promiseValue Promise with passed value, could be empty.
     * @returns Promise with Optional with passed value. If {@code value} is {@code null} or {@code undefined} teh {@link Optional.empty}
     * is returned.
     * @async
     */
    public static async ofAsync<T>(promiseValue: Promise<T | null | undefined>): Promise<Optional<T>> {
        return Optional.isNotEmpty(await promiseValue) ? Optional.of(await promiseValue) : Optional.empty();
    }

    /**
     * Creates optional from passed value, no mather what is it.
     * In this case {@code value} could be {@code nullish}, what means {@code null} or {@code undefined}.
     * @param value Passed value, could be empty.
     * @returns Optional with passed value. If {@code value} is {@code null} or {@code undefined} teh {@link Optional.empty}
     * is returned.
     */
    public static ofNullish<T>(value: T | null | undefined): Optional<T> {
        if (value !== null && value !== undefined) {
            Optional.isNotEmpty(value);
        }
        return Optional.EMPTY;
    }

    /**
     * Returns value of {@link Optional}.
     * @returns Value, if present.
     * @throws NoSuchElementError Error occurred when, {@link Optional.get} is
     * called on {@link Optional#empty}.
     */
    public get(): T {
        return RequireUtilityFunctions.requireNonEmptyValue(this.value);
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
        const supplierChecked: Supplier<T> = RequireUtilityFunctions.requireNonEmptySupplier(supplier);
        return Optional.isNotEmpty(this.value) ? this.value : supplierChecked();
    }

    /**
     * Returns {@code value} of {@link Optional}, or throw {@link NoSuchElementError} if empty.
     * @returns {@code value} of optional or if empty {@link Error} is throw.
     * @throws Custom Error occurred when, {@code code} is {@code null} or {@code undefined}
     */
    public orElseThrowError(exceptionSupplier: Supplier<Error>): T {
        if (this.isEmpty()) {
            throw exceptionSupplier();
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
        const consumerChecked: (x: T) => void = RequireUtilityFunctions.requireNonEmptyConsumer(consumer);
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
        const consumerPresentChecked: (x: T) => void = RequireUtilityFunctions.requireNonEmptyConsumer(consumerPresent);
        const consumerEmptyChecked: () => void = RequireUtilityFunctions.requireNonEmptyApply(applyEmpty);
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
        const funChecked: (x: T) => U = RequireUtilityFunctions.requireNonEmptyFunction(fun);
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
        const supplierChecked: () => T = RequireUtilityFunctions.requireNonEmptySupplier(supplier);
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
        const predicateChecked: (x: T) => boolean = RequireUtilityFunctions.requireNonEmptyPredicate(predicate);
        if (this.isEmpty()) {
            return Optional.empty();
        }
        return predicateChecked(this.value) ? this : Optional.empty();
    }
}
