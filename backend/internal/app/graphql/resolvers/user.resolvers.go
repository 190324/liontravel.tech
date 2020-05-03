package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
	"liontravel.tech/internal/pkg/status"
)

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
	oUser := &models.User{}
	_, result := oUser.AuthCheck("1eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJObyI6IjQ1NiIsIk5hbWUiOiIzNDUiLCJleHAiOjE1ODg0ODY2MzB9.GByMUBLtt6kFy92lcTi-au-06V8-EfxWNpBsXsBcKMpSRdriOuIgbk79BLC9GRDKDT7N16dmtZqoMWP5TyJkSf0iqDsZBl7AHSzGM3PJDk7m4uvlBi6OTxwxpDBD2_aUHnqPFeCcucgZV2zz9TaHDUJ1OZ8OFCxDbD1WqNSl1hd7xWYbUlKYcz8qksn4yLLNXx8ef4lzTchc2k_vYSdVOtPz7PUZFLVHHoV4XhLFiYrIYeRFvurUBWyQnaOjt55pBsUvmhES9vQewfp3QP7cHa4hrY82UejAzaOR2Sj0fE2aTccx1Aq-8-iiMmKLLrQCAzu9H6do-Jl1ixoCwyKYnw")

	return &models_gen.RBasic{
		Code: result,
		Msg: "",
	},nil
}
