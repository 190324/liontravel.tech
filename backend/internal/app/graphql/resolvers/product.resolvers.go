package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"path"
	"reflect"

	generated "liontravel.tech/build/gqlgen"
	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
	"liontravel.tech/internal/pkg/status"
	"liontravel.tech/internal/pkg/upload"
)

func (r *mutationResolver) Product(ctx context.Context, input models_gen.IProduct, no *string) (*models_gen.RProduct, error) {
	oProduct := &models.Product{}

	if no != nil {
		oProduct.FindByNo(*no)

		if IsLogin(ctx) {
			if oProduct.UserID != GetUser(ctx).ID {
				return &models_gen.RProduct{
					Code: status.BadRequest,
					Msg:  "",
					Data: nil,
				}, nil
			}
		}
	}

	oProduct.Name = input.Name
	oProduct.SalePrice = input.SalePrice
	oProduct.ListPrice = input.ListPrice
	oProduct.Qty = input.Qty
	oProduct.Brief = input.Brief
	oProduct.Desp = input.Desp
	oProduct.UserID = GetUser(ctx).ID
	oProduct.Save()

	// 圖片處理
	for _, image := range input.Images {
		if image != nil {
			filename, _ := upload.Upload(path.Join(oProduct.GetStoragePath(), oProduct.No), *image)
			if filename != nil {
				oStorage := &models.Storage{
					TableFrom:   reflect.TypeOf(oProduct).Elem().Name(),
					TableID:     oProduct.ID,
					Path:        *filename,
					ContentType: &image.ContentType,
					Seq:         0,
				}
				oStorage.Save()
			}
		}
	}

	return &models_gen.RProduct{
		Code: status.Success,
		Msg:  "",
		Data: oProduct,
	}, nil
}

func (r *productResolver) Images(ctx context.Context, obj *models.Product) ([]*models.Storage, error) {
	oStorages := &models.Storages{}
	oStorages.FindByRelation(reflect.TypeOf(obj).Elem().Name(), obj.ID)

	data := ([]*models.Storage)(*oStorages)

	return data, nil
}

func (r *queryResolver) Product(ctx context.Context, no string) (*models_gen.RProduct, error) {
	oProduct := &models.Product{}

	error := oProduct.FindByNo(no)

	if error != nil {
		return nil, error
	}

	return &models_gen.RProduct{
		Code: status.Success,
		Msg:  "success",
		Data: oProduct,
	}, nil
}

func (r *queryResolver) Products(ctx context.Context, filter *models_gen.IProductFilter, order []*string, page *int, perPage *int) (*models_gen.RProducts, error) {
	oProduct := &models.Product{}

	where := models.HandleWhere(filter)
	list, pageInfo := models.Pagination(oProduct, models.PaginateSetting{
		Page:    *page,
		PerPage: *perPage,
		Where:   where,
		Order:   order,
	})

	//data := ([]*models.Product)(*list.(*models.Products))
	data := *list.(*models.Products)

	return &models_gen.RProducts{
		Code: status.Success,
		Msg:  "Success",
		Data: &models_gen.ProductsPagination{
			PageInfo: pageInfo,
			Edges:    data,
		},
	}, nil
}

// Product returns generated.ProductResolver implementation.
func (r *Resolver) Product() generated.ProductResolver { return &productResolver{r} }

type productResolver struct{ *Resolver }
