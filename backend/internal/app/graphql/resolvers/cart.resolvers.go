package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	generated "liontravel.tech/build/gqlgen"
	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
	"liontravel.tech/internal/pkg/status"
)

func (r *cartResolver) Product(ctx context.Context, obj *models.Cart) (*models.Product, error) {
	oProd := &models.Product{}

	error := models.GetRow(oProd, &models.Product{
		ID: obj.ProductID,
	})

	if error != nil {
		return nil, nil
	}

	return oProd, nil
}

func (r *mutationResolver) Cart(ctx context.Context, productNo string, qty int) (*models_gen.RBasic, error) {
	o := &models.Cart{}
	oProd := &models.Product{}

	error := models.GetRow(oProd, &models.Product{
		No: productNo,
	})

	if error != nil {
		return &models_gen.RBasic{
			Code: status.BadRequest,
			Msg:  error.Error(),
		}, nil
	}

	error = models.GetRow(o, &models.Cart{
		ProductID: oProd.ID,
		UserID:    GetUser(ctx).ID,
	})

	if error == nil {
		return &models_gen.RBasic{
			Code: status.BadRequest,
			Msg:  "商品已加入購物車",
		}, nil
	}

	o.UserID = GetUser(ctx).ID
	o.ProductID = oProd.ID
	o.Qty = qty
	models.Save(o)

	return &models_gen.RBasic{
		Code: status.Success,
		Msg:  "200",
	}, nil
}

func (r *mutationResolver) NextBuy(ctx context.Context, no string, next int) (*models_gen.RBasic, error) {
	o := &models.Cart{}

	models.GetRow(o, &models.Cart{
		No: no,
	})
	o.Next = next
	models.Save(o)

	return &models_gen.RBasic{
		Code: status.Success,
		Msg:  "",
	}, nil
}

func (r *mutationResolver) DelCart(ctx context.Context, no string) (*models_gen.RBasic, error) {
	o := &models.Cart{}

	models.GetRow(o, &models.Cart{
		No: no,
	})

	if o.UserID != GetUser(ctx).ID {
		return &models_gen.RBasic{
			Code: status.BadRequest,
			Msg:  "",
		}, nil
	}

	o.Delete()

	return &models_gen.RBasic{
		Code: status.Success,
		Msg:  "",
	}, nil
}

func (r *queryResolver) Carts(ctx context.Context, next *int, page *int, perPage *int) (*models_gen.RCarts, error) {
	o := &models.Cart{}

	filter := &models.ICartsFilter{
		UserID: GetUser(ctx).ID,
	}

	where := models.HandleWhere(filter)
	list, pageInfo := models.Pagination(o, models.PaginateSetting{
		Page:    *page,
		PerPage: *perPage,
		Where:   where,
	})

	data := *list.(*models.Carts)

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
