import { AppliedFunctionIsNullOrUndefinedError } from './errors/applied-function-is-null-or-undefined.error';
import { AppliedConsumerIsNullOrUndefinedError } from './errors/applied-consmer-is-null-or-undefined.error';
import { AppliedPredicateIsNullOrUndefinedError } from './errors/applied-predicate-is-null-or-undefined.error';
import { Predicate } from './functions/predicate';
import { MonoFunction } from './functions/function';
import { Consumer } from './functions/consumer';
import { Optional } from './optional';

/**
 * Optional array for providing functionality with potentially empty arrays.
 * @author amidevtech
 */
export class OptionalArray<T> {
    /** Field responsible for empty value. It's returned each time if optional has not value. */
    private static readonly EMPTY: OptionalArray<undefined> = new OptionalArray<undefined>(undefined);

    /**
     * Constructor to create new instance of {@link OptionalArray}.
     * Constructor is private to prevent creating new objects with it,
     * to produce new {@link OptionalArray} use {@link ofArray}
     * @param value Value which {@link OptionalArray} is created.
     * @private
     */
    private constructor(private readonly value: T[]) {}

    /**
     * Util method used to check if {@code value} not {@code null} or {@code undefined}
     * @param value Value to check.
     * @private
     * @returns True, if value is {@code null} or {@code undefined}.
     */
    private static isEmpty<T>(value: T[]): boolean {
        return !OptionalArray.isNotEmpty(value);
    }

    /**
     * Util method used to check if {@code value} is not {@code null}
     * or {@code undefined} and {@code value.length > 0}
     * @param value Value to check.
     * @private
     * @returns True, if value is not {@code null} or {@code undefined} and {@code value.length > 0}.
     */
    private static isNotEmpty<T>(value: T[]): boolean {
        return value !== null && value !== undefined && value.length > 0;
    }

    /**
     * Util method to validate and return {@code consumer} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param consumer Consumer to check.
     * @private
     * @returns {@link Consumer}, if it's not {@code null} or {@code undefined}.
     * @throws AppliedConsumerIsNullOrUndefinedError if supplier is {@code null} or {@code undefined}.
     */
    private static requireNonEmptyConsumerArray<T>(consumer: (x: T[]) => void): (x: T[]) => void {
        if (consumer === null || consumer === undefined) {
            throw new AppliedConsumerIsNullOrUndefinedError();
        }
        return consumer;
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
     * Represents empty value, when {@code value} is {@code null} or {@code undefined} or array is empty.
     * @returns OptionalArray with empty value.
     */
    public static empty<T>(): OptionalArray<T> {
        return OptionalArray.EMPTY;
    }

    /**
     * Creates optional from passed value, no mather what is it.
     * In this case {@code value} could be {@code null} or {@code undefined}.
     * @param value Passed value, could be empty.
     * @returns OptionalArray with passed value. If {@code value} is {@code null} or {@code undefined} teh {@link OptionalArray.empty}
     * is returned.
     */
    public static ofArray<T>(value: T[]): OptionalArray<T> {
        return OptionalArray.isNotEmpty(value) ? OptionalArray.ofArray(value) : OptionalArray.empty();
    }

    /**
     * Check if {@code value} is empty.
     * @returns True, if {@code value} is {@code null} or {@code undefined}.
     */
    public isEmpty(): boolean {
        return OptionalArray.isEmpty(this.value);
    }

    /**
     * Check if {@code value} is present.
     * @returns True, if {@code value} is not {@code null} or {@code undefined}.
     */
    public isPresent(): boolean {
        return !OptionalArray.isEmpty(this.value);
    }

    /**
     * Compares with passed {@code optional}.
     * @param optional Optional to compare.
     * @returns True, if both values are present and value is the same, or both are empty.
     */
    public equals(optional: OptionalArray<T>): boolean {
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
     * Returns value of {@link OptionalArray} in safe way.
     * @returns Value, if present in otherwise empty array.
     */
    public getSafe(): T[] {
        if (OptionalArray.isNotEmpty(this.value)) {
            return this.value;
        } else {
            return [];
        }
    }

    /**
     * Apply consumer function {@link Consumer} on {@code value} if present.
     * @throws AppliedConsumerIsNullOrUndefinedError Error occurred when,
     * {@code consumer} is {@code null} or {@code undefined}.
     */
    public ifPresent(consumer: Consumer<T[]>): void {
        const consumerChecked: (x: T[]) => void = OptionalArray.requireNonEmptyConsumerArray(consumer);
        if (this.isPresent()) {
            consumerChecked(this.value);
        }
    }

    /**
     * Apply consumer function {@link Consumer} on {@code value} if present.
     * @throws AppliedConsumerIsNullOrUndefinedError Error occurred when,
     * {@code consumer} is {@code null} or {@code undefined}.
     */
    public ifOnePresent(consumer: Consumer<T>): void {
        const consumerChecked: (x: T) => void = OptionalArray.requireNonEmptyConsumer(consumer);
        if (this.isPresent() && this.value.length === 1) {
            this.value.forEach(consumerChecked)
        }
    }

    /**
     * Map {@link OptionalArray<T>} into {@link OptionalArray<U>} with {@link MonoFunction} {@code T -> U} if value exists,
     * else return empty as it was.
     * @param fun Mono function which transform {@code T -> U}
     * @returns OptionalArray of new type which was transformed using {@link MonoFunction}
     * @throws AppliedFunctionIsNullOrUndefinedError Error occurred when,
     * {@code fun} is {@code null} or {@code undefined}.
     */
    public map<U>(fun: MonoFunction<T, U>): OptionalArray<U> {
        const funChecked: (x: T) => U = OptionalArray.requireNonEmptyFunction(fun);
        return this.isEmpty() ? OptionalArray.empty() : OptionalArray.ofArray(this.value.map(funChecked));
    }

    /**
     * Function return {@link OptionalArray} with {@code value} if {@link predicate} on {@code value} is {@code True}
     * in other case it returns {@link OptionalArray.empty}
     * @param predicate Predicate to check against {@code value}.
     * @returns OptionalArray with value if {@code predicate} is {@code True}, if not - {@link OptionalArray.empty}
     * @throws AppliedPredicateIsNullOrUndefinedError Error occurred when,
     * {@code predicate} is {@code null} or {@code undefined}.
     */
    public filter(predicate: Predicate<T>): OptionalArray<T> {
        const predicateChecked: (x: T) => boolean = OptionalArray.requireNonEmptyPredicate(predicate);
        if (this.isEmpty()) {
            return OptionalArray.empty();
        }
        return OptionalArray.ofArray(this.value.filter(predicateChecked));
    }

    /**
     * Returns Optional with the value of the first element in the array where
     * predicate is true, and  {@link OptionalArray.empty} otherwise.
     * @param predicate Predicate to check against {@code value}.
     */
    public find(predicate: Predicate<T>): Optional<T> {
        const predicateChecked: (x: T) => boolean = OptionalArray.requireNonEmptyPredicate(predicate);
        return Optional.ofNullable(this.value.find(predicateChecked));
    }
}
