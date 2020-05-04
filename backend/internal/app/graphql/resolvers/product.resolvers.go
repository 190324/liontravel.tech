package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"reflect"
	"unsafe"

	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/middlewares"
	"liontravel.tech/internal/app/models"
	"liontravel.tech/internal/pkg/status"
)

func (r *mutationResolver) Product(ctx context.Context, input models_gen.IProduct, no *string) (*models_gen.RProduct, error) {
	oProduct := &models.Product{}

	if no != nil {
		oProduct.FindByNo(*no)

		if oProduct.UserID != middlewares.GetUser(ctx).ID {
			return &models_gen.RProduct{
				Code: status.BadRequest,
				Msg:  "",
				Data: nil,
			}, nil
		}
	}

	oProduct.Name = input.Name
	oProduct.SalePrice = input.SalePrice
	oProduct.ListPrice = input.ListPrice
	oProduct.Qty = input.Qty
	oProduct.Brief = input.Brief
	oProduct.Desp = input.Desp

	oProduct.Save()

	return &models_gen.RProduct{
		Code: status.Success,
		Msg:  "",
		Data: oProduct,
	}, nil
}

func (r *queryResolver) Product(ctx context.Context, no string) (*models_gen.RProduct, error) {
	oProduct := &models.Product{}

	error := oProduct.FindByNo(no)

	if error != nil {
		return nil, error
	}

	return &models_gen.RProduct{
		Code: 200,
		Msg:  "success",
		Data: oProduct,
	}, nil
}

func (r *queryResolver) Products(ctx context.Context, filter *models_gen.IProductFilter, page *int, perPage *int) (*models_gen.RProducts, error) {
	oProduct := &models.Product{}

	where := models.HandleWhere(filter)
	list, pageInfo := models.Pagination(oProduct, models.PaginateSetting{
		Page:    *page,
		PerPage: *perPage,
		Where:   where,
	})

	re := list.(*models.Products)
	rv := reflect.ValueOf(re)
	ptr := rv.Pointer()
	data := *(*[]*models.Product)(unsafe.Pointer(ptr))

	return &models_gen.RProducts{
		Code: 200,
		Msg:  "Success",
		Data: &models_gen.ProductsPagination{
			PageInfo: pageInfo,
			Edges:    data,
		},
	}, nil
}
