package ecpay

import (
	"crypto/sha256"
	"fmt"
	"github.com/spf13/viper"
	_ "liontravel.tech/internal/pkg/env"
	"net/url"
	"reflect"
	"sort"
	"strings"
	"time"
)

func UrlEncodeReplace(str string) string{
	for _, char := range UrlEncodeReplaceChar {
		strings.ReplaceAll(str, char.Encode, char.Replace)
	}
	return str
}

func CreateOrder() {
	merchantID := viper.GetString("cashflow.ecpay.merchantID")
	hashKey := viper.GetString("cashflow.ecpay.hashKey")
	hashIV := viper.GetString("cashflow.ecpay.hashIV")


	resultURL := "http://localhost:3000/payment/finish"
	data := &CreateOrderStruct{
		MerchantID:        merchantID,
		MerchantTradeNo:   fmt.Sprintf("%v", time.Now().Unix()),
		MerchantTradeDate: fmt.Sprintf("%v", time.Now().Format("2006/01/02 15:04:05")),
		PaymentType:       "aio",
		TotalAmount:       6666,
		TradeDesc:         "Test Shop",
		ItemName:          "Switch 9780 元 X2#PS4 PRO 11000 元 X1",
		ReturnURL:         "http://localhost:8888/payment/ecpay/callback",
		ChoosePayment:     "Credit",
		CheckMacValue:     "",
		ClientBackURL:     &resultURL,
		OrderResultURL:    &resultURL,
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

	fmt.Printf("%v\n, %v\n", data.MerchantTradeNo, data.MerchantTradeDate )
	fmt.Printf("%x\n\n", string(checkMacValue[:]))
}
