package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"reflect"
	"unsafe"

	generated "liontravel.tech/build/gqlgen"
	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
	"liontravel.tech/internal/pkg/status"
)

func (r *cartResolver) Product(ctx context.Context, obj *models.Cart) (*models.Product, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Cart(ctx context.Context, no string, next *int) (*models_gen.RBasic, error) {
	oCart := &models.Cart{}
	oProduct := &models.Product{}

	oProduct.FindByNo(no)

	if oProduct.ID <= 0 {
		return &models_gen.RBasic{
			Code: status.BadRequest,
			Msg:  "200",
		}, nil
	}

	oCart.UserID = GetUser(ctx).ID
	oCart.ProductID = oProduct.ID
	oCart.Next = *next
	oCart.Save()

	return &models_gen.RBasic{
		Code: status.Success,
		Msg:  "200",
	}, nil
}

func (r *queryResolver) Carts(ctx context.Context, next *int, page *int, perPage *int) (*models_gen.RCarts, error) {
	oCart := &models.Cart{}

	filter := map[string]interface{}{
		"user_id": GetUser(ctx).ID,
	}

	where := models.HandleWhere(filter)
	list, pageInfo := models.Pagination(oCart, models.PaginateSetting{
		Page:    *page,
		PerPage: *perPage,
		Where:   where,
	})

	re := list.(*models.Products)
	rv := reflect.ValueOf(re)
	ptr := rv.Pointer()
	data := *(*[]*models.Cart)(unsafe.Pointer(ptr))

	return &models_gen.RCarts{
		Code: status.Success,
		Msg:  "Success",
		Data: &models_gen.CartsPagination{
			PageInfo: pageInfo,
			Edges:    data,
		},
	}, nil
}

// Cart returns generated.CartResolver implementation.
func (r *Resolver) Cart() generated.CartResolver { return &cartResolver{r} }

type cartResolver struct{ *Resolver }
