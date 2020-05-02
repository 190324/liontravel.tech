package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"reflect"
	"unsafe"

	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
)

func (r *mutationResolver) Product(ctx context.Context, input *models_gen.IProduct, no *string) (*models.Product, error) {
	panic(fmt.Errorf("not implemented"))
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
