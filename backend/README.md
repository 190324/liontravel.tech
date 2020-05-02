## artisan

Create Model

```
go run cmd/artisan.go model -name [User]
```
Create migration sql file

```
go run cmd/artisan.go migration -name create_users_table -create users
```

Run migrate sync db

```
go run cmd/artisan.go migrate [-up] [-down] [-step 2]
```

Generate graphql schema

```
go run cmd/artisan.go gql
```

Generate private key

```
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```