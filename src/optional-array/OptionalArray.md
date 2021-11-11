# OptionalArray - usage example and documentation
`OptionalArray` is array class util which allows manipulation of array vales with null / undefined safety.
In addition, it makes code much easier to read and maintain removing boilerplate code.


## Getting first from list and apply some code:
```javascript
// Without OptionalArray 
const users: User[] = getUsers();
if (users !== undefined && users.length === 1) {
    console.log(users[0].name);
}

// With OptionalArray
OptionalArray.ofArray(getUsers()) .ifOnePresent(one => console.log(one));
```

## Finding element from list and apply some code:
```javascript
// Without OptionalArray 
const users: User[] = getUsers();
const user: User = users.find(user => user.name == 'test');
if (user !== undefined) {
    console.log(user.name);
}

// With OptionalArray
OptionalArray.ofArray(getAllUsers())
    .findOne(user => user.name == 'test')
    .ifPresent(user => console.log(user.name))
```
# Methods
## Create

### OptionalArray.empty
```javascript
// OptionalArray.ofArray - Create empty OptionalArray, equivalent of null/undefined/empty value
OptionalArray.empty(); // Create empty optional array, without value
```

### OptionalArray.ofArray
```javascript
// Create from value which can be null/undefined/empty
OptionalArray.ofArray(['value']); // Create optional with value ['value']
OptionalArray.ofArray(undefined); // Create empty optional array
OptionalArray.ofArray(null); // Create empty optional array
OptionalArray.ofArray([]); // Create empty optional array
```

### OptionalArray.ofNotNullishArray
```javascript
// OptionalArray.ofNotNullishArray - Create from value which can't be null/undefined but can be empty array
OptionalArray.ofNotNullishArray(['value']); // Create optional with value ['value']
OptionalArray.ofNotNullishArray([]); // Create empty optional
OptionalArray.ofNotNullishArray(undefined); // Throws an Error
OptionalArray.ofNotNullishArray(null); // Throws an Error
```

## Check if value exists
### OptionalArray.isEmpty
```javascript
// OptionalArray.isEmpty - Check if array is empty
OptionalArray.ofArray(['value']).isEmpty() // Returns False
OptionalArray.ofArray([]).isEmpty() // Returns True
OptionalArray.empty().isEmpty() // Returns True
```

### OptionalArray.isPresent
```javascript
// OptionalArray.isPresent - Check if value is present
OptionalArray.ofArray(['value']).isPresent() // Returns True
OptionalArray.ofArray([]).isPresent() // Returns False
OptionalArray.empty().isPresent() // Returns False
```

## Check and get value
### OptionalArray.get
```javascript
// OptionalArray.get - Get value if exists, otherwise trow error 
OptionalArray.ofArray(['value']).get() // Returns value
OptionalArray.ofArray([]).get() // Throws an Error
OptionalArray.empty().get() // Throws an Error
```

### OptionalArray.getSafe
```javascript
// OptionalArray.getSafe - Get value if exists, otherwise return empty array
OptionalArray.ofArray(['value']).getSafe() // Returns value
OptionalArray.ofArray([]).getSafe() // Returns []
OptionalArray.empty().getSafe() // Retunrs []
```

## Compares

### OptionalArray.equals
```javascript
// OptionalArray.equals - compare two objects
OptionalArray.ofArray(['value']).equals(OptionalArray.ofArray(['value'])) // Returns True
OptionalArray.empty().equals(OptionalArray.empty()) // Returns True
OptionalArray.ofArray(['value']).equals(OptionalArray.empty()) // Returns False
OptionalArray.ofArray(['one']).equals(OptionalArray.ofArray(['two'])) // Returns False
```

## Consumers

### OptionalArray.ifPresent
```javascript
// OptionalArray.ifPresent - apply function on whole array if exist
let len: number = 0;
OptionalArray.ofArray(['value']).ifPresent((array: string[]) => len = array.length) // Assign 1 to len
OptionalArray.ofArray([]).ifPresent((array: string[]) => len = array.length) // Do not assign anything, len will be 0
OptionalArray.empty([]).ifPresent((array: string[]) => len = array.length) // Do not assign anything, len will be 0
```

### OptionalArray.ifOnePresent
```javascript
// OptionalArray.ifOnePresent - apply function on element if array.lenght == 1
let one: string = '';
OptionalArray.ofArray(['value']).ifOnePresent((it: string) => one = it) // Assign 'value' to one
OptionalArray.ofArray(['value', 'value2']).ifOnePresent((it: string) => one = it) // Do not assign anything, one will be ''
OptionalArray.ofArray([]).ifOnePresent((it: string) => one = it) // Do not assign anything, one will be ''
OptionalArray.empty().ifOnePresent((it: string) => one = it) // Do not assign anything, one will be ''
```

## Manipulators
### OptionalArray.map
```javascript
// OptionalArray.map - Map object into another of exists
OptionalArray.ofArray(['value']).map((v: string) => len = v.length) // Will retrun OptionalArrray with length of each element
OptionalArray.empty().map((v: string) => v.length) // Will return empty as it was
```

### OptionalArray.filter
```javascript
// OptionalArray.filter - Filter objects with predicate and return OptionalArray with sub array
OptionalArray.ofArray(['one', 'oneone']).filter((v: string) => v.length === 3) // Will retrun OptionalArrray with value ['one']
OptionalArray.ofArray(['oneone']).filter((v: string) => v.length === 3) // Will retrun empty OptionalArrray
OptionalArray.ofArray([]).filter((v: string) => v.length === 3) // Will retrun empty OptionalArrray
OptionalArray.empty().filter((v: string) => v.length === 3) // Will retrun empty OptionalArrray
```

### OptionalArray.findOne
```javascript
// OptionalArray.findOne - Filter objects with predicate and return Optional with first element
OptionalArray.ofArray(['one', 'two']).findOne((v: string) => v.length === 3) // Will retrun Optional with value 'one'
OptionalArray.ofArray(['oneone']).findOne((v: string) => v.length === 3) // Will retrun empty Optional
OptionalArray.ofArray([]).findOne((v: string) => v.length === 3) // Will retrun empty Optional
OptionalArray.empty().findOne((v: string) => v.length === 3) // Will retrun empty Optional
```

### OptionalArray.getFirst
```javascript
// OptionalArray.getFirst - Return Optional with first element if exists, empty otherwise
OptionalArray.ofArray(['one', 'two']).getFirst() // Will retrun Optional with value 'one'
OptionalArray.ofArray([]).getFirst() // Will retrun empty Optional
OptionalArray.empty().getFirst() // Will retrun empty Optional
```


