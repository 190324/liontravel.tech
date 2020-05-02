package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
)

func (r *mutationResolver) Login(ctx context.Context, input *models_gen.ILogin) (*models_gen.RUser, error) {
	oUser := &models.User{
		Email:    input.Email,
		Password: input.Password,
	}

	oUser.Check()

	return nil, nil
}

func (r *mutationResolver) User(ctx context.Context, input *models_gen.IUser) (*models_gen.RUser, error) {
	oUser := &models.User{
		No:       input.No,
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}

	oUser.Save()

	return &models_gen.RUser{
		Code: 200,
		Msg:  "success",
		Data: oUser,
	}, nil
}

func (r *queryResolver) Me(ctx context.Context) (*models_gen.RUser, error) {
	panic(fmt.Errorf("not implemented"))
}
