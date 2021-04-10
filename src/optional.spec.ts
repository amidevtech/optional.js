import { Optional } from './optional';
import { NoSuchElementError } from './errors/no-such-element-error';
import { AppliedSupplierIsNullOrUndefinedError } from './errors/applied-supplier-is-null-or-undefined.error';
import { AppliedConsumerIsNullOrUndefinedError } from './errors/applied-consmer-is-null-or-undefined.error';
import { AppliedApplyIsNullOrUndefinedError } from './errors/applied-apply-is-null-or-undefined.error';
import { AppliedFunctionIsNullOrUndefinedError } from './errors/applied-function-is-null-or-undefined.error';

describe('Optional', () => {
    const text = 'test text';
    it('Optional.empty()" should be instance of Optional', () => {
        expect(Optional.empty()).toBeInstanceOf(Optional);
    });

    describe('Optional.get()', () => {
        it('should return value when "get()" is called and value exists', () => {
            expect(Optional.of(text).get()).toBe(text);
        });

        it('should throw error when "get()" is called and value do not exists', () => {
            expect(() => {
                Optional.empty().get();
            }).toThrowError(NoSuchElementError);
        });
    });

    describe('Optional.of(value: T)', () => {
        it('should create Optional "of()" when value exists', () => {
            expect(Optional.of(text).get()).toBe(text);
        });

        it('should throw error when "of()" is called on undefined', () => {
            expect(() => {
                Optional.of(undefined);
            }).toThrowError(NoSuchElementError);
        });

        it('should throw error when "of()" is called on null', () => {
            expect(() => {
                Optional.of(null);
            }).toThrowError(NoSuchElementError);
        });
    });

    describe('Optional.ofNullable(value: T)', () => {
        it('should create Optional "ofNullable()" when value exists', () => {
            expect(Optional.ofNullable(text).get()).toBe(text);
        });

        it('should create empty() when "ofNullable()" is called with undefined', () => {
            expect(Optional.ofNullable(undefined).isEmpty()).toBeTruthy();
        });

        it('should create empty() when "ofNullable()" is called with null', () => {
            expect(Optional.ofNullable(null).isEmpty()).toBeTruthy();
        });

        it('should throw error when get() is called on "ofNullable()" with null', () => {
            expect(() => {
                Optional.ofNullable(null).get();
            }).toThrowError(NoSuchElementError);
        });
        it('should throw error when get() is called on "ofNullable()" with undefined', () => {
            expect(() => {
                Optional.ofNullable(null).get();
            }).toThrowError(NoSuchElementError);
        });
    });
    describe('Optional.orElse()', () => {
        it('should return value when "orElse()" is called and value exists', () => {
            expect(Optional.of(text).orElse('another')).toBe(text);
        });
        it('should return else value when "orElse()" is called and value do not exists', () => {
            expect(Optional.empty().orElse(text)).toBe(text);
        });
    });

    describe('Optional.orElseGet(supplier: () => T)', () => {
        const supplierString: string = 'supplier';
        const supplier: () => string = () => supplierString;
        it('should return value when "orElseGet()" is called and value exists', () => {
            expect(Optional.of(text).orElseGet(supplier)).toBe(text);
        });
        it('should return supplier value when "orElseGet()" is called and value do not exists', () => {
            expect(Optional.empty().orElseGet(supplier)).toBe(supplierString);
        });
        it('should throw error when "orElseGet()" is called and supplier is undefined', () => {
            expect(() => {
                Optional.of(text).orElseGet(undefined);
            }).toThrowError(AppliedSupplierIsNullOrUndefinedError);
        });

        it('should throw error when "orElseGet()" is called and supplier is null', () => {
            expect(() => {
                Optional.of(text).orElseGet(null);
            }).toThrowError(AppliedSupplierIsNullOrUndefinedError);
        });
    });

    describe('Optional.orElseThrow()', () => {
        it('should return value when "orElseThrow()" is called and value exists', () => {
            expect(Optional.of(text).orElseThrow()).toBe(text);
        });
        it('should throw error when "orElseGet()" is called and supplier is null', () => {
            expect(() => {
                Optional.empty().orElseThrow();
            }).toThrowError(NoSuchElementError);
        });
    });

    describe('Optional.isEmpty()', () => {
        it('should return true when "isEmpty()" is called and value do not exists', () => {
            expect(Optional.empty().isEmpty()).toBeTruthy();
        });
        it('should return false when "isEmpty()" is called and value exists', () => {
            expect(Optional.of(text).isEmpty()).toBeFalsy();
        });
    });

    describe('Optional.isPresent()', () => {
        it('should return false when "isPresent()" is called and value do not exists', () => {
            expect(Optional.empty().isPresent()).toBeFalsy();
        });
        it('should return true when "isPresent()" is called and value exists', () => {
            expect(Optional.of(text).isPresent()).toBeTruthy();
        });
    });

    describe('Optional.equals(optional: Optional)', () => {
        it('should return true when "equals()" is called with itself when value exists', () => {
            const optional: Optional<string> = Optional.of(text);
            expect(optional.equals(optional)).toBeTruthy();
        });
        it('should return true when "equals()" is called with itself when value do not exists', () => {
            const optional: Optional<string> = Optional.empty();
            expect(optional.equals(optional)).toBeTruthy();
        });
        it('should return true when "equals()" is called with other optional with same value', () => {
            const optionalOne: Optional<string> = Optional.of(text);
            const optionalTwo: Optional<string> = Optional.of(text);
            expect(optionalOne.equals(optionalTwo)).toBeTruthy();
        });
        it('should return true when "equals()" is called on empty with other optional empty', () => {
            const optionalOne: Optional<string> = Optional.empty();
            const optionalTwo: Optional<string> = Optional.empty();
            expect(optionalOne.equals(optionalTwo)).toBeTruthy();
        });
        it('should return false when "equals()" is called with value and other empty optional', () => {
            const optionalOne: Optional<string> = Optional.of(text);
            const optionalTwo: Optional<string> = Optional.empty();
            expect(optionalOne.equals(optionalTwo)).toBeFalsy();
        });
        it('should return false when "equals()" is called on empty and other optional with value', () => {
            const optionalOne: Optional<string> = Optional.empty();
            const optionalTwo: Optional<string> = Optional.of(text);
            expect(optionalOne.equals(optionalTwo)).toBeFalsy();
        });
    });
    describe('Optional.ifPresent(consumer: (x: T) => void)', () => {
        it('should apply consumer on "ifPresent()" if value exists', () => {
            let testNumber: number = 0;
            const optional: Optional<string> = Optional.of(text);
            optional.ifPresent((x) => (testNumber = x.length));
            expect(testNumber).not.toBe(0);
            expect(testNumber).toBe(text.length);
        });
        it('should do not apply consumer on "ifPresent()" if value do not exists', () => {
            let testNumber: number = 0;
            const optional: Optional<string> = Optional.empty();
            optional.ifPresent((x) => (testNumber = x.length));
            expect(testNumber).not.toBe(text.length);
            expect(testNumber).toBe(0);
        });
        it('should throw error when "ifPresent()" is called and consumer is null', () => {
            expect(() => {
                const optional: Optional<string> = Optional.of(text);
                optional.ifPresent(null);
            }).toThrowError(AppliedConsumerIsNullOrUndefinedError);
        });
        it('should throw error when "ifPresent()" is called and consumer is undefined', () => {
            expect(() => {
                const optional: Optional<string> = Optional.of(text);
                optional.ifPresent(undefined);
            }).toThrowError(AppliedConsumerIsNullOrUndefinedError);
        });
    });

    describe('Optional.ifPresentOrElse', () => {
        it('should apply consumerPresent on "ifPresentOrElse()" if value exist', () => {
            let testNumber: number = 0;
            const optional: Optional<string> = Optional.of(text);
            optional.ifPresentOrElse(
                (x) => (testNumber = x.length),
                () => (testNumber = 2)
            );
            expect(testNumber).not.toBe(0);
            expect(testNumber).not.toBe(2);
            expect(testNumber).toBe(text.length);
        });
        it('should apply consumerEmpty on "ifPresentOrElse()" if value do not exist', () => {
            let testNumber: number = 0;
            const optional: Optional<string> = Optional.empty();
            optional.ifPresentOrElse(
                (x) => (testNumber = x.length),
                () => (testNumber = 2)
            );
            expect(testNumber).not.toBe(0);
            expect(testNumber).not.toBe(text.length);
            expect(testNumber).toBe(2);
        });
        it('should throw error when "ifPresentOrElse()" is called and consumer is null', () => {
            expect(() => {
                const optional: Optional<string> = Optional.of(text);
                optional.ifPresentOrElse(null, () => 2);
            }).toThrowError(AppliedConsumerIsNullOrUndefinedError);
        });
        it('should throw error when "ifPresentOrElse()" is called and consumer is undefined', () => {
            expect(() => {
                const optional: Optional<string> = Optional.of(text);
                optional.ifPresentOrElse(undefined, () => 2);
            }).toThrowError(AppliedConsumerIsNullOrUndefinedError);
        });
        it('should throw error when "ifPresentOrElse()" is called and apply is null', () => {
            expect(() => {
                const optional: Optional<string> = Optional.of(text);
                optional.ifPresentOrElse((x) => x.length, null);
            }).toThrowError(AppliedApplyIsNullOrUndefinedError);
        });
        it('should throw error when "ifPresentOrElse()" is called and apply is undefined', () => {
            expect(() => {
                const optional: Optional<string> = Optional.of(text);
                optional.ifPresentOrElse((x) => x.length, null);
            }).toThrowError(AppliedApplyIsNullOrUndefinedError);
        });
    });

    describe('Optional.map(fun (x: T) => U', () => {
        it('should apply function in "map()" if value exists', () => {
            const optional: Optional<string> = Optional.of(text);
            const optionalMap: Optional<number> = optional.map((x) => x.length);
            expect(optionalMap.isPresent()).toBeTruthy();
            expect(optionalMap.get()).toBe(text.length);
        });
        it('should not apply function in "map()" if value do not exist', () => {
            const optional: Optional<string> = Optional.empty();
            const optionalMap: Optional<number> = optional.map((x) => x.length);
            expect(optionalMap.isPresent()).toBeFalsy();
        });
        it('should throw error when "map()" is called with null function', () => {
            expect(() => {
                const optional: Optional<string> = Optional.of(text);
                optional.map(null);
            }).toThrowError(AppliedFunctionIsNullOrUndefinedError);
        });
        it('should throw error when "map()" is called with undefined function', () => {
            expect(() => {
                const optional: Optional<string> = Optional.of(text);
                optional.map(undefined);
            }).toThrowError(AppliedFunctionIsNullOrUndefinedError);
        });
    });

    describe('Optional.or(supplier () => T', () => {
        it('should return value in "or()" if value exists', () => {
            const optional: Optional<string> = Optional.of(text);
            const optionalOr: Optional<string> = optional.or(() => text + text);
            expect(optionalOr.isPresent()).toBeTruthy();
            expect(optionalOr.get()).toBe(text);
        });
        it('should apply supplier in "or()" if value do not exists', () => {
            const optional: Optional<string> = Optional.empty();
            const optionalOr: Optional<string> = optional.or(() => text + text);
            expect(optionalOr.isPresent()).toBeTruthy();
            expect(optionalOr.get()).toBe(text + text);
        });
        it('should throw error when "or()" is called with null supplier', () => {
            expect(() => {
                const optional: Optional<string> = Optional.empty();
                const optionalOr: Optional<string> = optional.or(null);
            }).toThrowError(AppliedSupplierIsNullOrUndefinedError);
        });
        it('should throw error when "or()" is called with undefined supplier', () => {
            expect(() => {
                const optional: Optional<string> = Optional.empty();
                const optionalOr: Optional<string> = optional.or(undefined);
            }).toThrowError(AppliedSupplierIsNullOrUndefinedError);
        });
    });
});
