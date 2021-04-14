/**
 * This type is alias for one argument function {@code (x: T) => U}
 * @type <T> Parametrized Type <T>
 * @returns <U> Returned Type <U>
 */
export type MonoFunction<T, U> = (x: T) => U;

/**
 * This type is alias for bi argument function {@code (x: T) => U}
 * @type <T> Parametrized Type <T>
 * @type <S> Parametrized Type <S>
 * @returns <U> Returned Type <U>
 */
export type BiFunction<T, S, U> = (x: T, y: S) => U;
