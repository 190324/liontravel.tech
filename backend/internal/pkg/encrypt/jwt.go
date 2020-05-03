package encrypt

import (
	"github.com/dgrijalva/jwt-go"
	"io/ioutil"
	"liontravel.tech/internal/pkg/status"
	"log"
	"strings"
)

func GenerateRS256Token(privateKeyPath string, claims jwt.Claims) string{
	key, err := ioutil.ReadFile(privateKeyPath)
	privateKey, _ := jwt.ParseRSAPrivateKeyFromPEM(key)

	if err != nil {
		panic(err)
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
	// Create the JWT string
	tokenString, _ := token.SignedString(privateKey)

	return  tokenString
}

func CheckRS256Token(publicKeyPath string, token string, claims jwt.Claims) (int){
	key, err := ioutil.ReadFile(publicKeyPath)
	publicKey, _ := jwt.ParseRSAPublicKeyFromPEM(key)

	if err != nil {
		panic(err)
	}

	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return publicKey, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			log.Printf("StatusUnauthorized: %v\n", err)
			return status.Unauthorized
		}
		log.Printf("StatusBadRequest: %v\n", err)

		if strings.Contains(err.Error(), "token is expired by") {
			return status.UnauthorizedAccessTokenExpired
		}

		return status.BadRequest
	}
	if !tkn.Valid {
		log.Printf("StatusUnauthorized\n")
		return status.UnauthorizedAccessTokenExpired
	}

	return status.Success
}