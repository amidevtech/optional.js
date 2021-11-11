import { Optional } from '../optional/optional';
import { NoSuchElementError } from '../errors/no-such-element-error';
import { OptionalArray } from './optional-array';
import { AppliedConsumerIsNullOrUndefinedError } from '../errors/applied-consmer-is-null-or-undefined.error';
import { AppliedFunctionIsNullOrUndefinedError } from '../errors/applied-function-is-null-or-undefined.error';
import { AppliedPredicateIsNullOrUndefinedError } from '../errors/applied-predicate-is-null-or-undefined.error';

describe('OptionalArray', () => {
    const nNull: string[] = null;
    const nUndefined: string[] = undefined;
    const empty: string[] = [];
    const one: string[] = ['one'];
    const filled: string[] = ['one', 'two', 'three'];
    const repeated: string[] = ['one', 'two', 'two', 'one', 'three'];

    it('OptionalArray.empty()" should be instance of OptionalArray', () => {
        expect(OptionalArray.empty()).toBeInstanceOf(OptionalArray);
    });
    describe('OptionalArray.get', () => {
        it('should return value when "get()" is called and value exists', () => {
            expect(OptionalArray.ofArray(filled).get()).toBe(filled);
        });
        it('should throw an error when "get()" is called and value do not exists', () => {
            expect(() => {
                OptionalArray.empty().get();
            }).toThrowError(NoSuchElementError);
        });
        it('should throw an error when "get()" is called and array is empty', () => {
            expect(() => {
                OptionalArray.ofArray(empty).get();
            }).toThrowError(NoSuchElementError);
        });
    });
    describe('OptionalArray.isEmpty', () => {
        it('should return false on "isEmpty()" when value exists', () => {
            expect(OptionalArray.ofArray(filled).isEmpty()).toBeFalsy();
        });
        it('should return true on "isEmpty()" when array is empty', () => {
            expect(OptionalArray.ofArray(empty).isEmpty()).toBeTruthy();
        });
        it('should return true on "isEmpty()" when is null', () => {
            expect(OptionalArray.ofArray(null).isEmpty()).toBeTruthy();
        });
        it('should return true on "isEmpty()" when array is undefined', () => {
            expect(OptionalArray.ofArray(undefined).isEmpty()).toBeTruthy();
        });
    });
    describe('OptionalArray.isPresent', () => {
        it('should return true on "isPresent()" when value exists', () => {
            expect(OptionalArray.ofArray(filled).isPresent()).toBeTruthy();
        });
        it('should return false on "isNullish()" when array is empty', () => {
            expect(OptionalArray.ofArray(empty).isPresent()).toBeFalsy();
        });
        it('should return false on "isPresent()" when array is null', () => {
            expect(OptionalArray.ofArray(null).isPresent()).toBeFalsy();
        });
        it('should return false on "isPresent()" when array is undefined', () => {
            expect(OptionalArray.ofArray(undefined).isPresent()).toBeFalsy();
        });
    });
    describe('OptionalArray.ofArray', () => {
        it('should create OptionalArray "ofArray()" when value exists', () => {
            expect(OptionalArray.ofArray(filled).get()).toBe(filled);
        });

        it('should create OptionalArray "ofArray()" when value is null or undefined', () => {
            expect(OptionalArray.ofArray(nNull).isEmpty()).toBeTruthy();
            expect(OptionalArray.ofArray(nNull).equals(OptionalArray.empty())).toBeTruthy();

            expect(OptionalArray.ofArray(nUndefined).isEmpty()).toBeTruthy();
            expect(OptionalArray.ofArray(nUndefined).equals(OptionalArray.empty())).toBeTruthy();
        });

        it('should create OptionalArray "ofArray()" when array is empty', () => {
            expect(OptionalArray.ofArray(empty).isEmpty()).toBeTruthy();
            expect(OptionalArray.ofArray(empty).equals(OptionalArray.empty())).toBeTruthy();
        });
    });
    describe('OptionalArray.ofNotNullishArray', () => {
        it('should create OptionalArray "ofNotNullishArray()" when value exists', () => {
            expect(OptionalArray.ofArray(filled).get()).toBe(filled);
        });

        it('should throw error when "ofNotNullishArray()" is called on undefined', () => {
            expect(() => {
                OptionalArray.ofNotNullishArray(undefined);
            }).toThrowError(NoSuchElementError);
        });
        it('should throw error when "ofNotNullishArray()" is called on null', () => {
            expect(() => {
                OptionalArray.ofNotNullishArray(null);
            }).toThrowError(NoSuchElementError);
        });
        it('should create OptionalArray empty if "ofNotNullishArray()" and when array is empty', () => {
            expect(OptionalArray.ofNotNullishArray(empty).isEmpty()).toBeTruthy();
            expect(OptionalArray.ofNotNullishArray(empty).equals(OptionalArray.empty())).toBeTruthy();
        });
    });
    describe('OptionalArray.equals', () => {
        it('should return true when "equals()" is called two same objects', () => {
            expect(OptionalArray.ofArray(filled).equals(OptionalArray.ofArray(filled))).toBeTruthy();
        });
        it('should return false when "equals()" is called two different objects', () => {
            expect(OptionalArray.ofArray(filled).equals(OptionalArray.ofArray(repeated))).toBeFalsy();
        });
        it('should return true when "equals()" is called two empty objects', () => {
            expect(OptionalArray.empty().equals(OptionalArray.empty())).toBeTruthy();
        });
    });
    describe('OptionalArray.getSafe', () => {
        it('should return value when "getSafe()" is called and value exists', () => {
            expect(OptionalArray.ofArray(filled).getSafe()).toStrictEqual(filled);
        });
        it('should return value with empty array when "getSafe()" is called and value do not exists', () => {
            expect(OptionalArray.empty().getSafe()).toStrictEqual(empty);
        });
        it('should return value with empty array when "getSafe()" is called and value do not exists', () => {
            expect(OptionalArray.ofArray(empty).getSafe()).toStrictEqual(empty);
        });
    });
    describe('OptionalArray.isPresent', () => {
        it('should return false when "isPresent()" is called and value do not exists', () => {
            expect(OptionalArray.empty().isPresent()).toBeFalsy();
        });
        it('should return true when "isPresent()" is called and value exists', () => {
            expect(OptionalArray.ofArray(filled).isPresent()).toBeTruthy();
        });
    })
    describe('Optional.ifPresent', () => {
        it('should apply consumer on "ifPresent()" if value exists', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            let optionalLength: number = 0;
            optional.ifPresent((x) => (optionalLength = x.length));
            expect(optionalLength).not.toBe(0);
            expect(optionalLength).toBe(filled.length);
        });
        it('should do not apply consumer on "ifPresent()" if value do not exists', () => {
            const optional: OptionalArray<string> = OptionalArray.empty();
            let optionalLength: number = undefined;
            optional.ifPresent((x) => (optionalLength = x.length));
            expect(optionalLength).not.toBe(0);
            expect(optionalLength).toBe(undefined);
        });
        it('should throw error when "ifPresent()" is called and consumer is null', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
                optional.ifPresent(null);
            }).toThrowError(AppliedConsumerIsNullOrUndefinedError);
        });
        it('should throw error when "ifPresent()" is called and consumer is undefined', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
                optional.ifPresent(undefined);
            }).toThrowError(AppliedConsumerIsNullOrUndefinedError);
        })
    });
    describe('Optional.ifOnePresent', () => {
        it('should apply consumer on "ifOnePresent()" if value exists with one element', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(one);
            let optionalFirst: string = undefined;
            optional.ifOnePresent((x) => (optionalFirst = x));
            expect(optionalFirst).not.toBe(undefined);
            expect(optionalFirst).toBe(one[0]);
        });
        it('should do not apply consumer on "ifOnePresent()" if value exists with more than one element', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            let optionalLength: number = undefined;
            optional.ifOnePresent((x) => (optionalLength = x.length));
            expect(optionalLength).not.toBe(0);
            expect(optionalLength).toBe(undefined);
        });
        it('should do not apply consumer on "ifOnePresent()" if value do not exists', () => {
            const optional: OptionalArray<string> = OptionalArray.empty();
            let optionalLength: number = undefined;
            optional.ifOnePresent((x) => (optionalLength = x.length));
            expect(optionalLength).not.toBe(0);
            expect(optionalLength).toBe(undefined);
        });
        it('should throw error when "ifOnePresent()" is called and consumer is null', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.ofArray(one);
                optional.ifOnePresent(null);
            }).toThrowError(AppliedConsumerIsNullOrUndefinedError);
        });
        it('should throw error when "ifOnePresent()" is called and consumer is undefined', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.ofArray(one);
                optional.ifOnePresent(undefined);
            }).toThrowError(AppliedConsumerIsNullOrUndefinedError);
        })
    });
    describe('Optional.map', () => {
        it('should apply function in "map()" if value exists', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            const optionalMap: OptionalArray<number> = optional.map((x) => x.length);
            expect(optionalMap.isPresent()).toBeTruthy();
            expect(optionalMap.get()).toStrictEqual(filled.map(x => x.length));
        });
        it('should not apply function in "map()" if value do not exist', () => {
            const optional: OptionalArray<string> = OptionalArray.empty();
            const optionalMap: OptionalArray<number> = optional.map((x) => x.length);
            expect(optionalMap.isPresent()).toBeFalsy();
        });
        it('should throw error when "map()" is called with null function', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
                optional.map(null);
            }).toThrowError(AppliedFunctionIsNullOrUndefinedError);
        });
        it('should throw error when "map()" is called with undefined function', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
                optional.map(undefined);
            }).toThrowError(AppliedFunctionIsNullOrUndefinedError);
        });
    })
    describe('Optional.filter', () => {
        it('should return value in "filter()" if value exists and predicate is true', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            const optionalOr: OptionalArray<string> = optional.filter((x: string) => x === filled[0]);
            expect(optionalOr.isPresent()).toBeTruthy();
            expect(optionalOr.get()).toStrictEqual([filled[0]]);
        });
        it('should return empty in "filter()" if value exists and predicate is false', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            const optionalOr: OptionalArray<string> = optional.filter((x: string) => x === 'four');
            expect(optionalOr.isPresent()).toBeFalsy();
        });
        it('should return sub array in "filter()" if couple value exists and predicate is true', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            const optionalOr: OptionalArray<string> = optional.filter((x: string) => x.length === 3);
            expect(optionalOr.isPresent()).toBeTruthy();
            expect(optionalOr.get()).toStrictEqual([filled[0], filled[1]]);
        });
        it('should return empty in "filter()" if value do not exists', () => {
            const optional: OptionalArray<string> = OptionalArray.empty();
            const optionalOr: OptionalArray<string> = optional.filter((x: string) => x === filled[0]);
            expect(optionalOr.isPresent()).toBeFalsy();
        });
        it('should throw error when "filter()" is called with null predicate', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.empty();
                const optionalPredicate: OptionalArray<string> = optional.filter(null);
            }).toThrowError(AppliedPredicateIsNullOrUndefinedError);
        });
        it('should throw error when "filter()" is called with undefined predicate', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.empty();
                const optionalPredicate: OptionalArray<string> = optional.filter(undefined);
            }).toThrowError(AppliedPredicateIsNullOrUndefinedError);
        });
    });
    describe('Optional.findOne', () => {
        it('should return value in "findOne()" if value exists and predicate is true', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            const optionalOr: Optional<string> = optional.findOne((x: string) => x === filled[0]);
            expect(optionalOr.isPresent()).toBeTruthy();
            expect(optionalOr.get()).toBe(filled[0]);
        });
        it('should return empty in "findOne()" if value exists and predicate is false', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            const optionalOr: Optional<string> = optional.findOne((x: string) => x === 'four');
            expect(optionalOr.isPresent()).toBeFalsy();
        });
        it('should return first one in "findOne()" if couple value exists and match and predicate is true', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            const optionalOr: Optional<string> = optional.findOne((x: string) => x.length === 3);
            expect(optionalOr.isPresent()).toBeTruthy();
            expect(optionalOr.get()).toBe(filled[0]);
        });
        it('should return empty in "findOne()" if value do not exists', () => {
            const optional: OptionalArray<string> = OptionalArray.empty();
            const optionalOr: Optional<string> = optional.findOne((x: string) => x === filled[0]);
            expect(optionalOr.isPresent()).toBeFalsy();
        });
        it('should throw error when "findOne()" is called with null predicate', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.empty();
                const optionalPredicate: Optional<string> = optional.findOne(null);
            }).toThrowError(AppliedPredicateIsNullOrUndefinedError);
        });
        it('should throw error when "findOne()" is called with undefined predicate', () => {
            expect(() => {
                const optional: OptionalArray<string> = OptionalArray.empty();
                const optionalPredicate: Optional<string> = optional.findOne(undefined);
            }).toThrowError(AppliedPredicateIsNullOrUndefinedError);
        });
    });
    describe('Optional.getFirst', () => {
        it('should return value in "getFirst()" if value exists', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(filled);
            const optionalOr: Optional<string> = optional.getFirst();
            expect(optionalOr.isPresent()).toBeTruthy();
            expect(optionalOr.get()).toBe(filled[0]);
        });
        it('should return empty in "getFirst()" if value do not exist', () => {
            const optional: OptionalArray<string> = OptionalArray.ofArray(empty);
            const optionalOr: Optional<string> = optional.getFirst();
            expect(optionalOr.isPresent()).toBeFalsy();
        });
    });
});
