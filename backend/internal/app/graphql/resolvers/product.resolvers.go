package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
)

func (r *mutationResolver) Product(ctx context.Context, input *models_gen.IProduct, no *string) (*models.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Product(ctx context.Context, no string) (*models_gen.RProduct, error) {
	oProduct := &models.Product{}

	error := oProduct.FindByNo(no)

	if error != nil {
		return nil, error
	}

	return &models_gen.RProduct{
		Code: 200,
		Msg: "success",
		Data: oProduct,
	}, nil
}

func (r *queryResolver) Products(ctx context.Context, filter *models_gen.IProductFilter) (*models_gen.RProducts, error) {
	panic(fmt.Errorf("not implemented"))
}
