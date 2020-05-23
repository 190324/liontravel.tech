package main

import (
	//"errors"
	"github.com/99designs/gqlgen/graphql/handler"

	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"helloworld/graph"
	"helloworld/graph/generated"
	"net/http"
	//"runtime/debug"
	"time"
)

// Defining the Graphql handler
func graphqlHandler() gin.HandlerFunc{ //gin.HandlerFunc
	// NewExecutableSchema and Config are in the generated.go file
	// Resolver is in the resolver.go file
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	return func(c *gin.Context) {
		srv.ServeHTTP(c.Writer, c.Request)
	}
}

func wsHandler() *handler.Server{

	schema := generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}})
	srv := handler.New(schema)

	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	})
	//srv.AddTransport(transport.Options{})
	//srv.AddTransport(transport.GET{})
	//srv.AddTransport(transport.POST{})
	//srv.AddTransport(transport.MultipartForm{})
	//
	//srv.Use(extension.Introspection{})

	return srv
}

// Defining the Playground handler
func playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/query")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}


func main() {
	// Setting up Gin
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		//AllowOrigins:     []string{"http://localhost:8080","http://localhost:3000"},
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "GET"},
		AllowHeaders:     []string{"Origin","Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		MaxAge: 12 * time.Hour,
	}))


	r.GET("/query", gin.WrapH(wsHandler()))
	r.POST("/query", graphqlHandler())
	r.GET("/", playgroundHandler())
	r.Run()
}
