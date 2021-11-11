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
```javascript
// OptionalArray.ofArray - Create empty OptionalArray, equivalent of null/undefined/empty value
OptionalArray.empty(); // Create empty optional array, without value

// Create from value which can be null/undefined/empty
OptionalArray.ofArray(['value']); // Create optional with value ['value']
OptionalArray.ofArray(undefined); // Create empty optional array
OptionalArray.ofArray(null); // Create empty optional array
OptionalArray.ofArray([]); // Create empty optional array

// OptionalArray.ofNotNullishArray - Create from value which can't be null/undefined but can be empty array
OptionalArray.ofNotNullishArray(['value']); // Create optional with value ['value']
OptionalArray.ofNotNullishArray([]); // Create empty optional
OptionalArray.ofNotNullishArray(undefined); // Throws an Error
OptionalArray.ofNotNullishArray(null); // Throws an Error

```

## Check if value exists
```javascript
// OptionalArray.isEmpty - Check if array is empty
OptionalArray.ofArray(['value']).isEmpty() // Returns False
OptionalArray.ofArray([]).isEmpty() // Returns True
OptionalArray.empty().isEmpty() // Returns True

// OptionalArray.isPresent - Check if value is present
OptionalArray.ofArray(['value']).isPresent() // Returns True
OptionalArray.ofArray([]).isPresent() // Returns False
OptionalArray.empty().isPresent() // Returns False
```

## Check and Get value
```javascript
// OptionalArray.get - Get value if exists, otherwise trow error 
OptionalArray.ofArray(['value']).get() // Returns value
OptionalArray.ofArray([]).get() // Throws an Error
OptionalArray.empty().get() // Throws an Error

// OptionalArray.getSafe - Get value if exists, otherwise return empty array
OptionalArray.ofArray(['value']).getSafe() // Returns value
OptionalArray.ofArray([]).getSafe() // Returns []
OptionalArray.empty().getSafe() // Retunrs []
```

## Compares
```javascript
// OptionalArray.equals - compare two objects
OptionalArray.ofArray(['value']).equals(OptionalArray.ofArray(['value'])) // Returns True
OptionalArray.empty().equals(OptionalArray.empty()) // Returns True
OptionalArray.ofArray(['value']).equals(OptionalArray.empty()) // Returns False
OptionalArray.ofArray(['one']).equals(OptionalArray.ofArray(['two'])) // Returns False
```
