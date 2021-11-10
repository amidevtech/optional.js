# optional.js
Makes TypeScript/JavaScript code `undefined`/`null` safe! 

Optional.js is a wrapper for `undefined` and `null` values in TypeScript/JavaScript which fixes problems with handling this values.

# Reasons to use optional.js
- Eliminate errors correlated with `undefined` / `null` handling in code.
- Makes you aware of possible scenarios when value is `undefined` / `null`.
- Built in methods for handling `undefined` / `null` to reduce required checks.
- Makes code easier to read.

Change this:
```javascript
const user: User = getUser(4);
if (user !== undefined) {
    console.log(user.name);
}
```
into this:
```javascript
getUser(4).ifPresent(user => console.log(user.name))
```

# Features 
- Contains known from [Java Optional](https://docs.oracle.com/javase/9/docs/api/java/util/Optional.html) (Without `stream()`) and more.
- Written in TypeScript with type checking.
- No external dependencies.
- Small footprint.
- 100% code coverage.

# Installation
Download from npm or from [GitHub](https://github.com/amidevtech/optional.js)

# Usage
The perfect example for showing necessity of using `Optional` is when method returns object which data based on provided argument,
and there is possibility that method will not return us proper builded object.

Like in example below, there is method which returns `User` based on provided `id`. If no `User` will be associated with `id` will
method return undefined.
```javascript
// Without Optional
// Method to handle
public getUser(id: number): User | undefined {
    ...
}
// Standard usage 
const user: User = getUser(4);
if (user !== undefined) {
    console.log(user.name);
}

// With Optional ussage
// Method to handle
public getUser(id: number): Optional<User> {
...
}
// Standard usage 
const user: Optional<User> = getUser(4);
user.ifPresent(u => console.log(u.name))
// Or even
getUser(4).ifPresent(user => console.log(user.name))
```

# Methods
## Create

```javascript
// Create empty Optional, equivalent of null/undefined value
Optional.empty(); // Create empty optional, without value

// Create from value which can be null/undefined
Optional.ofNullable('value'); // Create optional with value 'value'
Optional.ofNullable(undefined); // Create empty optional
Optional.ofNullable(null); // Create empty optional


// Create from value which can't be null/undefined
Optional.of('value'); // Create optional with value 'value'
Optional.of(undefined); // Throws an Error
```

NOTE - as `Optional.ofNullable(undefined)` and `Optional.ofNullable(null)`
creates Optional.empty() in further examples only one example will be used

## Check if value exists

```javascript
// Optional.isEmpty
Optional.ofNullable('value').isEmpty() // Returns False
Optional.empty().isEmpty() // Returns True

// Optional.isPresent
Optional.ofNullable('value').isPresent() // Returns True
Optional.empty().isPresent() // Returns False
```

## Check and Get value
```javascript
// Optional.get
Optional.ofNullable('value').get() // Returns value
Optional.empty().get() // Throws an Error

// Optional.orElse
Optional.ofNullable('value').orElse('else') // Returns value
Optional.empty().orElse('else') // Returns else

// Optional.orElseGet
const text: string = "text";
Optional.of('value').orElseGet(() => text + text) // Returns value
Optional.empty().orElseGet(() => text + text) // Returns texttex

// Optional.orElseThrow
Optional.of('value').orElseThrowError(() => throw new Error()) // Returns value
Optional.empty().orElseThrowError(() => new CustomErrorExtedByError()) // Throws CustomErrorExtedByError
```

## Compares

```javascript
// Optional.equals
Optional.of('value').equals(Optional.of('value')) // Returns True
Optional.empty().equals(Optional.empty()) // Returns True
Optional.of('value').equals(Optional.empty()) // Returns False
Optional.of('one').equals(Optional.of('two')) // Returns False
```

## Consumers

```javascript
// Optional.ifPresent
let len: number = 0;
Optional.of('value').ifPresent((v: string) => len = v.length) // Assign 5 to len
Optional.empty().ifPresent((v: string) => len = v.length) // Do not assign anything, len will be 0
```
```javascript
// Optional.ifPresentOrElse
let len: number = 0;
Optional.of('value').ifPresentOrElse((v: string) => len = v.length, () => len = 10) // Assign 5 to len
Optional.empty().ifPresentOrElse((v: string) => len = v.length, () => len = 10) // Assign 10 to len
```


## Manipulators 
```javascript
// Optional.map
Optional.of('value').map((v: string) => len = v.length) // Will retrun Optional with value 5
Optional.empty().map((v: string) => len = v.length) // Will return empty as it was
```

```javascript
// Optional.or
Optional.of('value').or(() => 5) // Will retrun Optional with value 5
Optional.empty().or(() => 5) // Will retrun Optional with value 5
```

```javascript
// Optional.filter
Optional.of(5).filter((x: number) => x === 5) // Will retrun Optional with value 5, as is not empty and meets condition
Optional.of(10).filter((x: number) => x === 5) // Will retrun Optional.empty(), as is not empty but do not meets condition
Optional.empty().filter((x: number) => x === 5) // Will return empty, as it is empty.
```



# Optional ArrayOpt - Addition to handling efficiency with arrays.
Change this:
```javascript
const users: User[] = getUsers();
if (users !== undefined && users.length === 1) {
    console.log(users[0].name);
}
```
into:
```javascript
OptionalArray.ofArray(getUsers()) .ifOnePresent(one => console.log(one));
```

## Create
```javascript
// Create from value which can be null/undefined
OptionalArray.ofArray(['value']); // Create optional with value ['value']
OptionalArray.ofArray(undefined); // Create empty optional array
OptionalArray.ofArray(null); // Create empty optional array
OptionalArray.ofArray([]); // Create empty optional array
```
```javascript
// Optional.isEmpty
OptionalArray.ofArray(['value']).isEmpty() // Returns False
OptionalArray.empty().isEmpty() // Returns True

// Optional.isPresent
OptionalArray.ofArray(['value']).isPresent() // Returns True
Optional.empty().isPresent() // Returns False
```

## Check and Get value
```javascript
// Optional.get
Optional.ofNullable('value').get() // Returns value
Optional.empty().get() // Throws an Error
