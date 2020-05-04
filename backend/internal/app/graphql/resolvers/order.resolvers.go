package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	generated "liontravel.tech/build/gqlgen"
	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
)

func (r *orderResolver) No(ctx context.Context, obj *models.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *orderResolver) UserName(ctx context.Context, obj *models.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *orderResolver) UserPhone(ctx context.Context, obj *models.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *orderResolver) UserAddress(ctx context.Context, obj *models.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *orderResolver) ReceiverName(ctx context.Context, obj *models.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *orderResolver) ReceiverPhone(ctx context.Context, obj *models.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *orderResolver) ReceiverAddress(ctx context.Context, obj *models.Order) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *orderResolver) Discount(ctx context.Context, obj *models.Order) (*float64, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *orderResolver) Total(ctx context.Context, obj *models.Order) (float64, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *orderResolver) Status(ctx context.Context, obj *models.Order) (int, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Order(ctx context.Context) (*models_gen.ROrder, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Orders(ctx context.Context) (*models_gen.ROrders, error) {
	panic(fmt.Errorf("not implemented"))
}

// Order returns generated.OrderResolver implementation.
func (r *Resolver) Order() generated.OrderResolver { return &orderResolver{r} }

type orderResolver struct{ *Resolver }
