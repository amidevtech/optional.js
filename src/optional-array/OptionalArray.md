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
