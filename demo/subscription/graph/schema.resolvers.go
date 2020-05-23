package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"helloworld/graph/generated"
	"helloworld/graph/model"
	"math/rand"
	"time"
)

func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	//panic(fmt.Errorf("not implemented"))
	return []*model.Todo{
		{
			ID:   "001",
			Text: "klksldf",
			Done: true,
		},
	}, nil
}

func (r *queryResolver) Ping(ctx context.Context) (string, error) {
	return "pong", nil
}

func (r *subscriptionResolver) Notification(ctx context.Context) (<-chan string, error) {

	msgs := make(chan string, 1)

	go func() {
		for {
			msgs <- randString(50)
			time.Sleep(1 * time.Second)
		}
	}()


	return msgs, nil
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func randString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	s := string(b)
	return s
}


// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
