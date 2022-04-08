## GraphQL Basics

Helps you to query specific field on objects. A field could a string or on an object.
If a field is an object then it can traverse related objects and their fields, letting clients fetch lots of related data in one request, instead of many
One can pass in arguments to fields (strings or objects). Each of the arguments can be of many different types. For Ex: If we are looking for human whose id is 100 we can do the following:

```javascript
// here human, name, height are fields. id, unit..etc are field arguments.
    {
        human(id: "1000") { //passing argument to object to filter out data
            name
            height(unit: FOOT) //passing argument to scalar field to perform data-transformations
        }
    }
    // will fetch human with id = 1000
    {
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

## Field Aliases

If you want to have same fields with different arguments in a query that is not possible (because of fields conflict). To overcome this, one has to add aliases to the query. For Ex:

```javascript

query {
	location(id:3) {
    id
  }
	location(id:4) {
    id
  }
}
//would result in error
{
  "error": {
    "errors": [
      {
        "message": "Fields \"location\" conflict because they have differing arguments. Use different aliases on the fields to fetch both if this was intentional.",
        "locations": [
          {
            "line": 2,
            "column": 3
          },
          {
            "line": 5,
            "column": 3
          }
        ],
        "extensions": {
          "code": "GRAPHQL_VALIDATION_FAILED"
        }
      }
    ]
  }
}

// instead
query {
	id3Loc: location(id:3) {
    id
  }
	id4Loc: location(id:4) {
    id
  }
}
//would fetch
{
  "data": {
    "id3Loc": {
      "id": "3"
    },
    "id4Loc": {
      "id": "4"
    }
  }
}
```

## Operation names

Operation Name: Helps you to name your operations. It is recommended to use operation names with application having mulitple operations. An operation can either be query, mutation or subscription. For Ex:

```javascript
// here operation-type is query, operation-name is HeroComparison, $first is a variable of type "Int" and has a value of 3
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}
```

If you have fields that you don't want repeat, you can use fragments. Think of a fragment as a JS object. For Ex:

```javascript
// here fields in leftComparison and rightComparison are repeated
{
  leftComparison: hero(episode: EMPIRE) {
    name
    appearsIn
    friends {
        name
    }
  }
  rightComparison: hero(episode: EMPIRE) {
    name
    appearsIn
    friends {
        name
    }
  }
}

// here you are declaring a JS object like fragment which allows you to not repeat fields.
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

## Variables

Arguments are static, variables on the other hand help you to dynamically fetch information. One can also use varaibles in fragments. For Ex:

```javascript
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

The "first" variable is difficult as a query string because on the client side one would have to not only dynamically generate query-string but also need to serialize it into a GraphQL-specific format. Instead, GraphQL has a first-class way to factor dynamic values out of the query, and pass them as a separate dictionary. These values are called variables.

When we start working with variables, we need to do three things:

Replace the static value in the query with $variableName
Declare $variableName as one of the variables accepted by the query
Pass variableName: value in the separate, transport-specific (usually JSON) variables dictionary
