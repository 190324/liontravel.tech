package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"liontravel.tech/internal/pkg/status"

	generated "liontravel.tech/build/gqlgen"
	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
)

func (r *categoryResolver) Subclass(ctx context.Context, obj *models.Category) ([]*models.Category, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Category(ctx context.Context, input models_gen.ICategory, no *string) (*models_gen.RCategory, error) {
	o := &models.Category{}

	if no != nil {
		error := models.GetRow(o, &models.Category{
			No: *no,
		})

		if error != nil {
			return &models_gen.RCategory{
				Code: status.BadRequest,
				Msg: error.Error(),
			}, nil
		}
	}

	image := ".."
	o.Name = input.Name
	o.Image = &image
	err := models.Save(o)

	if err != nil {
		return &models_gen.RCategory{
			Code: status.BadRequest,
			Msg: err.Error(),
			Data: nil,
		}, nil
	}

	return &models_gen.RCategory{
		Code: status.Success,
		Msg: "",
		Data: o,
	}, nil

}

func (r *mutationResolver) ReorderCategory(ctx context.Context, input *models_gen.IReorderCategory) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Category(ctx context.Context, no string) (*models_gen.RCategory, error) {
	o := &models.Category{}

	error := models.GetRow(o, &models.Category{
		No: no,
	})

	if error != nil {
		return &models_gen.RCategory{
			Code: status.BadRequest,
			Msg:  error.Error(),
		}, nil
	}

	return &models_gen.RCategory{
		Code: status.Success,
		Msg:  "success",
		Data: o,
	}, nil
}

func (r *queryResolver) Categories(ctx context.Context, filter models_gen.ICategoryFilter) (*models_gen.RCategories, error) {
	panic(fmt.Errorf("not implemented"))
}

// Category returns generated.CategoryResolver implementation.
func (r *Resolver) Category() generated.CategoryResolver { return &categoryResolver{r} }

type categoryResolver struct{ *Resolver }