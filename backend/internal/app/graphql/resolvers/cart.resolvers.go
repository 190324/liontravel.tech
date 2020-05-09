package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"reflect"
	"unsafe"

	generated "liontravel.tech/build/gqlgen"
	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
	"liontravel.tech/internal/pkg/status"
)

func (r *cartResolver) Product(ctx context.Context, obj *models.Cart) (*models.Product, error) {
	oProduct := &models.Product{}

	oProduct.FindByID(obj.ProductID)

	if oProduct.ID <= 0 {
		return nil, nil
	}

	return oProduct, nil
}

func (r *mutationResolver) Cart(ctx context.Context, productNo string, qty int) (*models_gen.RBasic, error) {
	oCart := &models.Cart{}
	oProduct := &models.Product{}

	oProduct.FindByNo(productNo)

	if oProduct.ID <= 0 {
		return &models_gen.RBasic{
			Code: status.BadRequest,
			Msg:  "200",
		}, nil
	}

	oCart.FindByPIDnUID(oProduct.ID, GetUser(ctx).ID)
	oCart.Qty = qty
	oCart.Save()

	return &models_gen.RBasic{
		Code: status.Success,
		Msg:  "200",
	}, nil
}

func (r *mutationResolver) NextBuy(ctx context.Context, no string, next int) (*models_gen.RBasic, error) {
	oCart := &models.Cart{}

	oCart.FindByNo(no)
	oCart.Next = next
	oCart.Save()

	return &models_gen.RBasic{
		Code: status.Success,
		Msg:  "",
	}, nil
}

func (r *mutationResolver) DelCart(ctx context.Context, no string) (*models_gen.RBasic, error) {
	oCart := &models.Cart{}

	oCart.FindByNo(no)

	if oCart.UserID != GetUser(ctx).ID {
		return &models_gen.RBasic{
			Code: status.BadRequest,
			Msg:  "",
		}, nil
	}

	oCart.Delete()

	return &models_gen.RBasic{
		Code: status.Success,
		Msg:  "",
	}, nil
}

func (r *queryResolver) Carts(ctx context.Context, next *int, page *int, perPage *int) (*models_gen.RCarts, error) {
	oCart := &models.Cart{}

	filter := &models.ICartsFilter{
		UserID: GetUser(ctx).ID,
	}

	where := models.HandleWhere(filter)
	list, pageInfo := models.Pagination(oCart, models.PaginateSetting{
		Page:    *page,
		PerPage: *perPage,
		Where:   where,
	})

	re := list.(*models.Carts)
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
