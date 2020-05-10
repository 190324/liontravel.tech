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
	"liontravel.tech/internal/pkg/cashflow/ecpay"
	"liontravel.tech/internal/pkg/status"
)

func (r *mutationResolver) Order(ctx context.Context, input models_gen.IOrder) (*models_gen.REcpay, error) {
	oOrder := models.Order{}
	oOrder.UserID = GetUser(ctx).ID
	oOrder.UserName = input.UserName
	oOrder.UserPhone = input.UserPhone
	oOrder.UserAddress = input.UserAddress
	oOrder.ReceiverName = input.ReceiverName
	oOrder.ReceiverPhone = input.ReceiverPhone
	oOrder.ReceiverAddress = input.ReceiverAddress
	oOrder.Discount = 0
	oOrder.Total = 0
	oOrder.PaymentType = 0
	oOrder.PaymentVendor = 0
	oOrder.Save()

	// 購物車結算
	oCart := &models.Cart{}
	filter := &models.ICartsFilter{
		UserID: GetUser(ctx).ID,
	}
	where := models.HandleWhere(filter)
	query, oCarts, _ := oCart.Find(where)
	query.Find(oCarts)

	re := oCarts.(*models.Carts)
	rv := reflect.ValueOf(re)
	ptr := rv.Pointer()
	carts := *(*[]*models.Cart)(unsafe.Pointer(ptr))

	var total float64 = 0
	for _, item := range carts {
		oOrderItem := &models.OrderItem{}
		oProduct := &models.Product{}
		oProduct.FindByID(item.ProductID)

		if oProduct.ID > 0 {
			oOrderItem.OrderID = oOrder.ID
			oOrderItem.ProductID = oProduct.ID
			oOrderItem.Qty = item.Qty
			oOrderItem.Price = oProduct.SalePrice
			oOrderItem.Save()

			total = total + float64(oOrderItem.Qty)*oOrderItem.Price
		}
	}

	// 寫入總額
	oOrder.Total = total
	oOrder.Save()

	oOrderItems := &models.OrderItems{}
	oOrderItems.FindAllByOrderID(oOrder.ID)

	result := ecpay.CreateOrder(oOrder, *oOrderItems)
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
