package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	models_gen "liontravel.tech/build/gqlgen/models"
)

func (r *mutationResolver) Cart(ctx context.Context, productID int) (*models_gen.RBasic, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Carts(ctx context.Context, next *int) (*models_gen.RCarts, error) {
	panic(fmt.Errorf("not implemented"))
}
