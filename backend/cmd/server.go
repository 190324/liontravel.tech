
package main

import (
	generated "liontravel.tech/build/gqlgen"
	"liontravel.tech/internal/app/graphql/resolvers"
	_ "liontravel.tech/internal/pkg/env"
	"context"
	"errors"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/spf13/viper"
	"log"
	"net/http"
	"runtime/debug"
)

func main() {

	port := viper.GetString("server.port")

	Config := generated.Config{Resolvers: &resolvers.Resolver{}}
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(Config))
	srv.SetRecoverFunc(func(ctx context.Context, err interface{}) (userMessage error) {
		// send this panic somewhere
		log.Print(err)
		debug.PrintStack()
		return errors.New("user message on panic")
	})

	router := chi.NewRouter()

	cors := cors.New(cors.Options{
		// AllowedOrigins: []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins:   []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	})
	router.Use(cors.Handler)

	router.Group(func(r chi.Router) {
		r.Route("/graphql", func(r chi.Router) {
			r.Handle("/playground", playground.Handler("LionTech", "/graphql"))
			r.Handle("/", srv)
		})
	})

	log.Println("connect to http://localhost:" + port + "/ for graphql playground")
	log.Fatal(http.ListenAndServe(":" + port, router))
}
