# Clear Score | Aggregator

Clear Score Aggregator Service

## Usage

```sh
# assuming linux / wsl environment,
# build docker containers:
make build
make up
# inside the container, run
make run
# run unit tests
make test
```

```sh
# To stop containers:
make down
```

## Playground

GraphQL Playground should now be running on: <http://localhost:4000/graphql>

Try a simple query like:

```gql
{
  recommendedCreditCards(fullName: "John Smith", creditScore: 500) {
    creditCards {
      cardName
      apr
      eligibity
    }
  }
}
```

## Contributors

| [![Aviwe Ngqukumba][aviwembekeni_avatar]][aviwembekeni_homepage] |
|             [Aviwe Ngqukumba][aviwembekeni_homepage]             |

[aviwembekeni_homepage]: https://github.com/aviwembekeni
[aviwembekeni_avatar]: https://github.com/aviwembekeni.png?size=150
