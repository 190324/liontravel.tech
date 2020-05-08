package models

type EcpayForm struct {
	Uri string `json:"uri"`
	Params EcpayFormParams `json:"params"`
}

type EcpayFormParams struct {
	MerchantTradeNo   string
	MerchantTradeDate string
	CheckMacValue     string
	MerchantID        string
	PaymentType       string
	TotalAmount       float64
	TradeDesc         string
	ItemName          string
	ReturnURL         string
	ChoosePayment     string
	ClientBackURL     string
	OrderResultURL    string
	EncryptType       int
}