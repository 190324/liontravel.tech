package resolvers

import (
	"context"
	"liontravel.tech/internal/app/middlewares"
	"liontravel.tech/internal/app/models"
)

func IsLogin(ctx context.Context) bool{
	if middlewares.GetUser(ctx) != nil {
		return true
	}
	return false
}

func GetUser(ctx context.Context) *models.User{
	if IsLogin(ctx) {
		return middlewares.GetUser(ctx)
	}
	return nil
}

func GetAuthStatue(ctx context.Context) int{
	return middlewares.GetAuthStatus(ctx)
}