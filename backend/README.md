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
openssl genrsa -out access.key 2048
openssl rsa -in access.key -pubout > access.key.pub
```
