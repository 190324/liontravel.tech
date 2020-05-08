package ecpay

import (
	"crypto/sha256"
	"fmt"
	"github.com/spf13/viper"
	"liontravel.tech/internal/app/models"
	_ "liontravel.tech/internal/pkg/env"
	"net/url"
	"reflect"
	"sort"
	"strings"
)

func UrlEncodeReplace(str string) string{
	for _, char := range UrlEncodeReplaceChar {
		strings.ReplaceAll(str, char.Encode, char.Replace)
	}
	return str
}

func CreateOrder(m models.Order, items models.OrderItems) PaymentStruct{
	uri := viper.GetString("cashflow.ecpay.uri")
	merchantID := viper.GetString("cashflow.ecpay.merchantID")
	hashKey := viper.GetString("cashflow.ecpay.hashKey")
	hashIV := viper.GetString("cashflow.ecpay.hashIV")
	returnUri := viper.GetString("cashflow.ecpay.returnUri")
	clientBackUri := viper.GetString("cashflow.ecpay.clientBackUri")

	itemName := ""
	for _, item := range items {
		concat := ""
		if itemName != ""{
			concat = "#"
		}
		itemName = itemName + fmt.Sprintf("%v%v %v 元 X%v", concat, item.Product.Name, item.Price, item.Qty)
	}

	tradeDate := m.CreatedAt.Format("2006/01/02 15:04:05")

	data := &CreateOrderStruct{
		MerchantID:        merchantID,
		MerchantTradeNo:   m.No,
		MerchantTradeDate: fmt.Sprintf("%v", tradeDate),
		PaymentType:       "aio",
		TotalAmount:       m.Total,
		TradeDesc:         "LionTech Shop",
		ItemName:          itemName,//"Switch 9780 元 X2#PS4 PRO 11000 元 X1",
		ReturnURL:         returnUri,
		ChoosePayment:     "Credit",
		CheckMacValue:     "",
		ClientBackURL:     &clientBackUri,
		OrderResultURL:    &clientBackUri,
		EncryptType:       1,
	}

	sortData := map[string]interface{}{}

	//
	ele := reflect.ValueOf(data).Elem()
	for i:=0; i < ele.NumField() ; i++ {
		field := ele.Type().Field(i).Name
		value := ele.FieldByName(field)
		if !reflect.DeepEqual(value.Interface(), reflect.Zero(ele.Field(i).Type()).Interface()) {
			if ele.Field(i).Kind() == reflect.Ptr {
				sortData[field] = value.Elem().String()
			} else {
				sortData[field] = value
			}
		}
	}

	// map 排序
	keys := make([]string, 0, len(sortData))
	for k := range sortData {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	// 組成字串
	dataToString := "HashKey="+hashKey
	for _, k := range keys {
		dataToString = dataToString + "&" + k + "=" + fmt.Sprintf("%v", sortData[k])
	}
	dataToString = dataToString + "&HashIV="+hashIV

	// url encode 並轉成小寫
	dataToStringEncode := strings.ToLower(url.QueryEscape(dataToString))

	// url encode 替代字元
	dataToStringEncodeReplace := UrlEncodeReplace(dataToStringEncode)

	// sha256
	dataToStringEncodeReplaceByte := []byte(dataToStringEncodeReplace)
	checkMacValue := sha256.Sum256(dataToStringEncodeReplaceByte)

	//fmt.Printf("%v\n, %v\n", data.MerchantTradeNo, data.MerchantTradeDate )
	data.CheckMacValue = fmt.Sprintf("%x", string(checkMacValue[:]))

	result := PaymentStruct{
		Uri: uri,
		Params: *data,
	}

	return result
}
