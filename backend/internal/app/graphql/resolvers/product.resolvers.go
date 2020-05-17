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
	o := &models.Product{}

	if no != nil {
		error := models.GetRow(o, &models.Product{
			No: *no,
		})

		if error != nil {
			return &models_gen.RProduct{
				Code: status.BadRequest,
				Msg:  error.Error(),
			}, nil
		}

		if IsLogin(ctx) {
			if o.UserID != GetUser(ctx).ID {
				return &models_gen.RProduct{
					Code: status.BadRequest,
					Msg:  "您無法編輯",
					Data: nil,
				}, nil
			}
		}
	}

	o.Name = input.Name
	o.SalePrice = input.SalePrice
	o.ListPrice = input.ListPrice
	o.Qty = input.Qty
	o.Brief = input.Brief
	o.Desp = input.Desp
	o.UserID = GetUser(ctx).ID
	models.Save(o)

	// 圖片處理
	for _, image := range input.Images {
		if image != nil {
			filename, _ := upload.Upload(path.Join(o.GetStoragePath(), o.No), *image)
			if filename != nil {
				oStor := &models.Storage{
					TableFrom:   reflect.TypeOf(o).Elem().Name(),
					TableID:     o.ID,
					Path:        *filename,
					ContentType: &image.ContentType,
					Seq:         0,
				}
				models.Save(oStor)
			}
		}
	}

	return &models_gen.RProduct{
		Code: status.Success,
		Msg:  "",
		Data: o,
	}, nil
}

func (r *productResolver) Images(ctx context.Context, obj *models.Product) ([]*models.Storage, error) {
	oStor := &models.Storages{}
	oStor.FindByRelation(reflect.TypeOf(obj).Elem().Name(), obj.ID)

	data := ([]*models.Storage)(*oStor)

	return data, nil
}

func (r *queryResolver) Product(ctx context.Context, no string) (*models_gen.RProduct, error) {
	o := &models.Product{}

	error := models.GetRow(o, &models.Product{
		No: no,
	})

	if error != nil {
		return &models_gen.RProduct{
			Code: status.BadRequest,
			Msg:  error.Error(),
		}, nil
	}

	return &models_gen.RProduct{
		Code: status.Success,
		Msg:  "success",
		Data: o,
	}, nil
}

func (r *queryResolver) Products(ctx context.Context, filter *models.I_ProductFilter, order []*string, page *int, perPage *int) (*models_gen.RProducts, error) {
	o := &models.Product{}

	if filter != nil && filter.View != nil {
		if *filter.View == "self-edit" {
			userID := GetUser(ctx).ID
			filter.UserID = &userID
		}
	}
	where := models.HandleWhere(filter)
	list, pageInfo := models.Pagination(o, models.PaginateSetting{
		Page:    *page,
		PerPage: *perPage,
		Where:   where,
		Order:   order,
	})

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
