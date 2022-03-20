
import { NoSuchElementError } from '../errors/no-such-element-error';
import { Supplier } from './supplier';
import { AppliedSupplierIsNullOrUndefinedError } from '../errors/applied-supplier-is-null-or-undefined.error';
import { AppliedConsumerIsNullOrUndefinedError } from '../errors/applied-consmer-is-null-or-undefined.error';
import { Apply } from './apply';
import { AppliedApplyIsNullOrUndefinedError } from '../errors/applied-apply-is-null-or-undefined.error';
import { Predicate } from './predicate';
import { AppliedPredicateIsNullOrUndefinedError } from '../errors/applied-predicate-is-null-or-undefined.error';
import { MonoFunction } from './function';
import { AppliedFunctionIsNullOrUndefinedError } from '../errors/applied-function-is-null-or-undefined.error';
import { Optional } from '../optional/optional';

export class RequireUtilityFunctions {

    /**
     * Util method to validate and return {@code value} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param value Value to check.
     * @private
     * @returns {@code value}, if it's not {@code null} or {@code undefined}.
     * @throws NoSuchElementError if value is not present.
     */
    public static requireNonEmptyValue<T>(value: T): T {
        if (value === null || value === undefined) {
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
    public static requireNonEmptySupplier<T>(supplier: Supplier<T>): Supplier<T> {
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
    public static requireNonEmptyConsumer<T>(consumer: (x: T) => void): (x: T) => void {
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
    public static requireNonEmptyApply<T>(apply: Apply): Apply {
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
    public static requireNonEmptyPredicate<T>(predicate: Predicate<T>): Predicate<T> {
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
    public static requireNonEmptyFunction<T, U>(fun: MonoFunction<T, U>): MonoFunction<T, U> {
        if (fun === null || fun === undefined) {
            throw new AppliedFunctionIsNullOrUndefinedError();
        }
        return fun;
    }

    /**
     * Util method to validate and return {@code value} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param value Value to check.
     * @private
     * @returns {@code value}, if it's not {@code null} or {@code undefined}.
     * @throws NoSuchElementError if value is not present.
     */
    public static requireNonNullishValueArray<T>(value: T[]): T[] {
        if (value === null || value === undefined) {
            throw new NoSuchElementError();
        }
        return value;
    }

    /**
     * Util method to validate and return {@code consumer} if it's not {@code null} or {@code undefined},
     * in other way error is thrown.
     * @param consumer Consumer to check.
     * @private
     * @returns {@link Consumer}, if it's not {@code null} or {@code undefined}.
     * @throws AppliedConsumerIsNullOrUndefinedError if supplier is {@code null} or {@code undefined}.
     */
    public static requireNonEmptyConsumerArray<T>(consumer: (x: T[]) => void): (x: T[]) => void {
        if (consumer === null || consumer === undefined) {
            throw new AppliedConsumerIsNullOrUndefinedError();
        }
        return consumer;
    }
}
