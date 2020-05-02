package ecpay

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/spf13/viper"
	"io/ioutil"
	"liontravel.tech/internal/pkg/encrypt"
	_ "liontravel.tech/internal/pkg/env"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"
)

var merchantID string
var hashKey string
var hashIV string

func CreateInvoice() {
	merchantID = viper.GetString("cashflow.ecpay.merchantID")
	hashKey = viper.GetString("cashflow.ecpay.invoice.hashKey")
	hashIV = viper.GetString("cashflow.ecpay.invoice.hashIV")

	invoiceEncode := SendInvoice()
	result, _ := GetInvoice(invoiceEncode)

	fmt.Printf("\n%v\n", result)
}

// 向綠界請求發票
func SendInvoice() string{
	encodeData := EncodeDataHandle()

	timestamp := time.Now().Unix()
	RqID := fmt.Sprintf("q%v", timestamp)

	output := "{\"MerchantID\": \""+merchantID+"\",\"RqHeader\": {\"Timestamp\": "+fmt.Sprintf("%v",timestamp)+",\"RqID\": \""+RqID+"\",\"Revision\": \"3.0.0\"},\"Data\": \""+encodeData+"\"}"

	client := &http.Client{}
	r, _ := http.NewRequest("POST", "https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue", strings.NewReader(output))
	r.Header.Add("Content-Type", "application/json")
	resp, _ := client.Do(r)

	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(resp.Status)
	fmt.Println(string(body))

	result := &InvoiceResponseStruct{}
	json.Unmarshal(body, result)

	return result.Data
}

// 處理發票需要的明細資料
func EncodeDataHandle() string{
	no := fmt.Sprintf("NO%v", time.Now().Unix())

	str := "{\"MerchantID\": \""+merchantID+"\",\"RelateNumber\": \""+no+"\",\"CustomerID\": \"\",\"CustomerIdentifier\": \"\",\"CustomerName\":\"綠界科技股份有限公司\",\"CustomerAddr\": \"106 台北市南港區發票一街1號1樓\",\"CustomerPhone\": \"\",\"CustomerEmail\": \"test@ecpay.com.tw\",\"ClearanceMark\": \"1\",\"Print\": \"1\",\"Donation\": \"0\",\"LoveCode\": \"\",\"CarrierType\": \"\",\"CarrierNum\": \"\",\"TaxType\": \"1\",\"SalesAmount\": 100,\"InvoiceRemark\":\"發票備註\",\"InvType\": \"07\",\"vat\": \"1\",\"Items\": [ {\"ItemSeq\":1,\"ItemName\": \"item01\",\"ItemCount\":1,\"ItemWord\":\"件\",\"ItemPrice\": 50,\"ItemTaxType\": \"1\",\"ItemAmount\": 50,\"ItemRemark\": \"item01_desc\"},{\"ItemSeq\":2,\"ItemName\": \"item02\",\"ItemCount\":1,\"ItemWord\":\"個\",\"ItemPrice\": 20,\"ItemTaxType\": \"1\",\"ItemAmount\": 20,\"ItemRemark\": \"item02_desc\"},{\"ItemSeq\":3,\"ItemName\": \"item03\",\"ItemCount\": 3,\"ItemWord\": \"粒\",\"ItemPrice\": 10,\"ItemTaxType\": \"1\",\"ItemAmount\": 30,\"ItemRemark\": \"item03_desc\"}]}"

	encode, _ := encrypt.AesEncryptSimple([]byte(str), hashKey, hashIV)

	result := base64.StdEncoding.EncodeToString(encode)

	return result
}

// 解密發票資訊
func GetInvoice(str string) (interface{}, error){
	data, _ := base64.StdEncoding.DecodeString(str)
	aesDecrypt, _ := encrypt.AesDecryptSimple(data, hashKey, hashIV)

	decodeURI, err := url.QueryUnescape(string(aesDecrypt))
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return decodeURI, nil
}