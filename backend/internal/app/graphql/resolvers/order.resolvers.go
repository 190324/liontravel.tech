package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	models_gen "liontravel.tech/build/gqlgen/models"
	"liontravel.tech/internal/app/models"
	"liontravel.tech/internal/pkg/cashflow/ecpay"
	"liontravel.tech/internal/pkg/status"
)

func (r *mutationResolver) Order(ctx context.Context, input models_gen.IOrder) (*models_gen.REcpay, error) {
	o := models.Order{}
	o.UserID = GetUser(ctx).ID
	o.UserName = input.UserName
	o.UserPhone = input.UserPhone
	o.UserAddress = input.UserAddress
	o.ReceiverName = input.ReceiverName
	o.ReceiverPhone = input.ReceiverPhone
	o.ReceiverAddress = input.ReceiverAddress
	o.Discount = 0
	o.Total = 0
	o.PaymentType = 0
	o.PaymentVendor = 0
	models.Save(o)

	// 購物車結算
	oCart := &models.Cart{}
	filter := &models.ICartsFilter{
		UserID: GetUser(ctx).ID,
	}
	where := models.HandleWhere(filter)
	query, oCarts, _ := oCart.Find(where)
	query.Find(oCarts)

	carts := *oCarts.(*models.Carts)

	var total float64 = 0
	for _, item := range carts {
		oItem := &models.OrderItem{}
		oProd := &models.Product{}
		error := models.GetRow(oProd, &models.Product{
			ID: item.ProductID,
		})

		if error != nil {
			return &models_gen.REcpay{
				Code: status.Success,
				Msg:  error.Error(),
			}, nil
		}

		oItem.OrderID = o.ID
		oItem.ProductID = oProd.ID
		oItem.Qty = item.Qty
		oItem.Price = oProd.SalePrice
		models.Save(oItem)

		total = total + float64(oItem.Qty)*oItem.Price
	}

	// 寫入總額
	o.Total = total
	models.Save(o)

	oOrderItems := &models.OrderItems{}
	oOrderItems.FindAllByOrderID(o.ID)

	result := ecpay.CreateOrder(o, *oOrderItems)
	oCart.DeleteByUserID(GetUser(ctx).ID)

	return &models_gen.REcpay{
		Code: status.Success,
		Msg:  "",
		Data: &models.EcpayForm{
			Uri: result.Uri,
			Params: models.EcpayFormParams{
				MerchantTradeNo:   result.Params.MerchantTradeNo,
				MerchantTradeDate: result.Params.MerchantTradeDate,
				CheckMacValue:     result.Params.CheckMacValue,
				MerchantID:        result.Params.MerchantID,
				PaymentType:       result.Params.PaymentType,
				TotalAmount:       result.Params.TotalAmount,
				TradeDesc:         result.Params.TradeDesc,
				ItemName:          result.Params.ItemName,
				ReturnURL:         result.Params.ReturnURL,
				ChoosePayment:     result.Params.ChoosePayment,
				ClientBackURL:     *result.Params.ClientBackURL,
				OrderResultURL:    *result.Params.OrderResultURL,
				EncryptType:       result.Params.EncryptType,
			},
		},
	}, nil
}

func (r *queryResolver) Order(ctx context.Context) (*models_gen.ROrder, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Orders(ctx context.Context) (*models_gen.ROrders, error) {
	panic(fmt.Errorf("not implemented"))
}
