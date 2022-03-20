# Optional - usage example and documentation
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

### Optional.empty
```javascript
// Optional.empty - Create empty Optional, equivalent of null/undefined value
Optional.empty(); // Create empty optional, without value
```

### Optional.ofNullable

```javascript
// Optional.ofNullable - Create from value which can be null/undefined
Optional.ofNullable('value'); // Create optional with value 'value'
Optional.ofNullable(undefined); // Create empty optional
Optional.ofNullable(null); // Create empty optional
```

### Optional.ofNullish

```javascript
// Optional.ofNullish - Create from value which can be null/undefined
Optional.ofNullish('value'); // Create optional with value 'value'
Optional.ofNullish(undefined); // Create empty optional
Optional.ofNullish(null); // Create empty optional
```

### Optional.of
```javascript
// Optional.of - Create from value which can't be null/undefined
Optional.of('value'); // Create optional with value 'value'
Optional.of(undefined); // Throws an Error
```

NOTE - as `Optional.ofNullable(undefined)` and `Optional.ofNullable(null)`
creates Optional.empty() in further examples only one example will be used

### Optional.ofAsync
```javascript
Optional.ofAsync(Promise.resolve('text')) // Returns Promise<Optional<string>>
```

## Check if value exists

### Optional.isEmpty
```javascript
// Optional.isEmpty - Check if Optional does not have value
Optional.ofNullable('value').isEmpty() // Returns False
Optional.empty().isEmpty() // Returns True
```

### Optional.isPresent
```javascript
// Optional.isPresent - Check if Optional does have value
Optional.ofNullable('value').isPresent() // Returns True
Optional.empty().isPresent() // Returns False
```

## Check and get value
### Optional.get
```javascript
// Optional.get - Get value if exist, otherwise throw error
Optional.ofNullable('value').get() // Returns value
Optional.empty().get() // Throws an Error
```
### Optional.orElse
```javascript
// Optional.orElse - Returns value if exists, else passed value
Optional.ofNullable('value').orElse('else') // Returns value
Optional.empty().orElse('else') // Returns else
```

### Optional.orElseGet
```javascript
// Optional.orElseGet - Returns value if exists, otherwise passed supplier
const text: string = "text";
Optional.of('value').orElseGet(() => text + text) // Returns value
Optional.empty().orElseGet(() => text + text) // Returns texttex
```

### Optional.orElseThrow
```javascript
// Optional.orElseThrow - Returns value if exists, otherwise throw error
Optional.of('value').orElseThrowError(() => throw new Error()) // Returns value
Optional.empty().orElseThrowError(() => new CustomErrorExtedByError()) // Throws CustomErrorExtedByError
```

## Compares

### Optional.equals
```javascript
// Optional.equals - Compare two Optional
Optional.of('value').equals(Optional.of('value')) // Returns True
Optional.empty().equals(Optional.empty()) // Returns True
Optional.of('value').equals(Optional.empty()) // Returns False
Optional.of('one').equals(Optional.of('two')) // Returns False
```

## Consumers

### Optional.ifPresent
```javascript
// Optional.ifPresent - Apply consumer if value is present
let len: number = 0;
Optional.of('value').ifPresent((v: string) => len = v.length) // Assign 5 to len
Optional.empty().ifPresent((v: string) => len = v.length) // Do not assign anything, len will be 0
```

### Optional.ifPresentOrElse
```javascript
// Optional.ifPresentOrElse - Apply consumer if value is present, otherwise apply supplier
let len: number = 0;
Optional.of('value').ifPresentOrElse((v: string) => len = v.length, () => len = 10) // Assign 5 to len
Optional.empty().ifPresentOrElse((v: string) => len = v.length, () => len = 10) // Assign 10 to len
```


## Manipulators
### Optional.map
```javascript
// Optional.map - Map value if exists
Optional.of('value').map((v: string) => v.length) // Will retrun Optional with value 5
Optional.empty().map((v: string) => v.length) // Will return empty as it was
```

### Optional.or
```javascript
// Optional.or - Return Optional from value if exists, otherwise create one from supplier
Optional.of('value').or(() => 5) // Will retrun Optional with value 5
Optional.empty().or(() => 5) // Will retrun Optional with value 5

```

### Optional.filter
```javascript
// Optional.filter - Filter Optional wtih predicate and return Optional with value if meet condition, otherwise empty
Optional.of(5).filter((x: number) => x === 5) // Will retrun Optional with value 5, as is not empty and meets condition
Optional.of(10).filter((x: number) => x === 5) // Will retrun Optional.empty(), as is not empty but do not meets condition
Optional.empty().filter((x: number) => x === 5) // Will return empty, as it is empty.
```

