package resolvers

import (
	"context"
	"liontravel.tech/internal/app/middlewares"
	"liontravel.tech/internal/app/models"
	"log"
)

func IsLogin(ctx context.Context) bool{
	if middlewares.GetUser(ctx) != nil {
		return true
	}
	return false
}

func GetUser(ctx context.Context) *models.User{
	log.Printf("user: %v", middlewares.GetUser(ctx))
	if IsLogin(ctx) {
		return middlewares.GetUser(ctx)
	}
	return nil
}