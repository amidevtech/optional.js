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

Or this:
```javascript
const users: User[] = getUsers();
const user: User = users.find(user => user.name == 'test');
if (user !== undefined) {
    console.log(user.name);
}
```
into this:
```javascript
OptionalArray.ofArray(getAllUsers())
    .findOne(user => user.name == 'test')
    .ifPresent(user => console.log(user.name))
```

# Features 
- Contains known from [Java Optional](https://docs.oracle.com/javase/9/docs/api/java/util/Optional.html) (Without `stream()`) and more.
- Contains useful methods which reduce boilerplate code for array operations.
- Written in TypeScript with type checking.
- No external dependencies.
- Small footprint.
- 100% code coverage.

# Installation
Download from npm or from [GitHub](https://github.com/amidevtech/optional.js)

# Changelog
Can be found at [Changelog](https://github.com/amidevtech/optional.js/CHANGELOG.md)

# Usage
Library consist of two main class/helpers
- Optional - Designed to handle null / undefined safety for single values. 
  - [Readme with usage examples of Optional](./src/optional/Optional.md)
- OptionalArray - Designed to handle null / undefined safety for arrays. 
  - [Readme with usage examples of OptionalArray](./src/optional-array/OptionalArray.md)

