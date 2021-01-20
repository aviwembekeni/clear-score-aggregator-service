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

On the GraphQL Playground, click the settings icon and make sure that schema.polling.enable is set to false.

Try a simple query like:

```gql
{
  recommendedCreditCards(name: "John Smith", creditScore: 500, salary: 20000) {
    creditCards {
      provider
      name
      apr
      cardScore
    }
  }
}
```

## Contributors

| [![Aviwe Ngqukumba][aviwembekeni_avatar]][aviwembekeni_homepage] |
| [Aviwe Ngqukumba][aviwembekeni_homepage] |

[aviwembekeni_homepage]: https://github.com/aviwembekeni
[aviwembekeni_avatar]: https://github.com/aviwembekeni.png?size=150
