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

func (r *mutationResolver) Login(ctx context.Context, input models_gen.ILogin) (*models_gen.RAuth, error) {
	oUser := &models.User{
		Email:    &input.Email,
		Password: &input.Password,
	}

	isValid := oUser.Check()

	var code int

	oAuth := &models.AuthToken{}
	if isValid {
		code = status.Success
		oAuth = oUser.AuthToken()
	} else {
		code = status.Unauthorized
		oAuth = nil
	}

	return &models_gen.RAuth{
		Code: code,
		Msg:  "success",
		Data: oAuth,
	}, nil
}

func (r *mutationResolver) TPLogin(ctx context.Context, input models_gen.ITPLogin) (*models_gen.RAuth, error) {
	/*  todo:
	 *	驗證 access_token 合法性
	 *	https://graph.facebook.com/oauth/access_token_info?client_id=551080055549701&access_token=[access_token]
	 */
	oOpenID := &models.OpenID{
		AppType: input.AppType,
		AppID:   input.AppID,
	}

	oUser := &models.User{}
	userID := oOpenID.GetUserID()

	if userID == 0 {
		oUser.Name = input.Name
		oUser.Save()

		oOpenID.UserID = oUser.ID
		oOpenID.Save()
	} else {
		oUser.FindByID(userID)
	}

	var code int
	var oAuth *models.AuthToken
	code = status.Success
	oAuth = oUser.AuthToken()

	return &models_gen.RAuth{
		Code: code,
		Msg:  "",
		Data: oAuth,
	}, nil
}

func (r *mutationResolver) User(ctx context.Context, input models_gen.IUser) (*models_gen.RBasic, error) {
	oUser := &models.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
	}

	if IsLogin(ctx) {
		oUser.No = GetUser(ctx).No
	}

	oUser.Save()

	return &models_gen.RBasic{
		Code: status.Success,
		Msg:  "success",
	}, nil
}

func (r *queryResolver) Me(ctx context.Context) (*models_gen.RBasic, error) {
	_status := middlewares.GetAuthStatus(ctx)

	if _status == 0 {
		_status = status.Unauthorized
	}

	return &models_gen.RBasic{
		Code: _status,
		Msg:  "",
	}, nil
}
