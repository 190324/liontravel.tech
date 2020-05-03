package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/middlewares"
	"liontravel.tech/internal/app/models"
	"liontravel.tech/internal/pkg/status"
)

type contextKey struct {
	name string
}

func (r *mutationResolver) Login(ctx context.Context, input *models_gen.ILogin) (*models_gen.RAuth, error) {
	oUser := &models.User{
		Email:    input.Email,
		Password: input.Password,
	}

	isValid := oUser.Check()

	var code int

	oAuth := &models.AuthToken{}
	if isValid {
		code = status.Success
		oAuth = oUser.AuthToken()
	}else {
		code = status.Unauthorized
		oAuth = nil
	}

	return &models_gen.RAuth{
		Code: code,
		Msg:  "success",
		Data: oAuth,
	}, nil
}

func (r *mutationResolver) User(ctx context.Context, input *models_gen.IUser) (*models_gen.RBasic, error) {
	oUser := &models.User{
		No:       input.No,
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}

	oUser.Save()

	return &models_gen.RBasic{
		Code: status.Success,
		Msg:  "success",
	}, nil
}

func (r *queryResolver) Me(ctx context.Context) (*models_gen.RBasic, error) {
	//oUser := &models.User{}
	//_, result := oUser.AuthCheck("")

	_status := middlewares.GetAuthStatus(ctx)

	if _status == 0 {
		_status = status.Unauthorized
	}

	return &models_gen.RBasic{
		Code: _status,
		Msg: "",
	},nil
}
