package ecpay

type CreateOrderStruct struct {
	MerchantID string
	MerchantTradeNo string
	StoreID *string
	MerchantTradeDate string
	PaymentType string
	TotalAmount int
	TradeDesc string
	ItemName string
	ReturnURL string
	ChoosePayment string
	CheckMacValue string
	ClientBackURL *string
	ItemURL *string
	Remark *string
	ChooseSubPayment *string
	OrderResultURL *string
	NeedExtraPaidInfo *string
	DeviceSource *string
	IgnorePayment *string
	PlatformID *string
	InvoiceMark *string
	CustomField1 *string
	CustomField2 *string
	CustomField3 *string
	CustomField4 *string
	EncryptType int `json:"encrypt_type" default:10`
	Language *string
}

type UrlEncodeReplaceCharStruct struct {
	Origin string
	Encode string
	Replace string
}

var UrlEncodeReplaceChar = []UrlEncodeReplaceCharStruct{
	//{
	//	Origin:  "-",
	//	Encode:  "-",
	//	Replace: "-",
	//},
	//{
	//	Origin:  "_",
	//	Encode:  "_",
	//	Replace: "_",
	//},
	//{
	//	Origin:  ".",
	//	Encode:  ".",
	//	Replace: ".",
	//},
	{
		Origin:  "!",
		Encode:  "%21",
		Replace: "!",
	},
	{
		Origin:  "~",
		Encode:  "~",
		Replace: "%7e",
	},
	{
		Origin:  "*",
		Encode:  "%2a",
		Replace: "*",
	},
	{
		Origin:  "(",
		Encode:  "%28",
		Replace: "(",
	},
	{
		Origin:  ")",
		Encode:  "%29",
		Replace: ")",
	},
	//{
	//	Origin:  " ",
	//	Encode:  "+",
	//	Replace: "+",
	//},
	//{
	//	Origin:  "@",
	//	Encode:  "%40",
	//	Replace: "%40",
	//},
	//{
	//	Origin:  "#",
	//	Encode:  "%23",
	//	Replace: "%23",
	//},
	//{
	//	Origin:  "$",
	//	Encode:  "%24",
	//	Replace: "%24",
	//},
	//{
	//	Origin:  "%",
	//	Encode:  "%25",
	//	Replace: "%25",
	//},
	//{
	//	Origin:  "^",
	//	Encode:  "%5e",
	//	Replace: "%5e",
	//},
	//{
	//	Origin:  "&",
	//	Encode:  "%26",
	//	Replace: "%26",
	//},
	//{
	//	Origin:  "=",
	//	Encode:  "%3d",
	//	Replace: "%3d",
	//},
	//{
	//	Origin:  "+",
	//	Encode:  "%2b",
	//	Replace: "%2b",
	//},
	//{
	//	Origin:  ";",
	//	Encode:  "%3b",
	//	Replace: "%3b",
	//},
	//{
	//	Origin:  "?",
	//	Encode:  "%3f",
	//	Replace: "%3f",
	//},
	//{
	//	Origin:  "/",
	//	Encode:  "%2f",
	//	Replace: "%2f",
	//},
	//{
	//	Origin:  "\\",
	//	Encode:  "%5c",
	//	Replace: "%5c",
	//},
	//{
	//	Origin:  ">",
	//	Encode:  "%3e",
	//	Replace: "%3e",
	//},
	//{
	//	Origin:  "<",
	//	Encode:  "%3c",
	//	Replace: "%3c",
	//},
	//{
	//	Origin:  "`",
	//	Encode:  "%60",
	//	Replace: "%60",
	//},
	//{
	//	Origin:  "[",
	//	Encode:  "%5b",
	//	Replace: "%5b",
	//},
	//{
	//	Origin:  "]",
	//	Encode:  "%5d",
	//	Replace: "%5d",
	//},
	//{
	//	Origin:  "{",
	//	Encode:  "%7b",
	//	Replace: "%7b",
	//},
	//{
	//	Origin:  "}",
	//	Encode:  "%7d",
	//	Replace: "%7d",
	//},
	//{
	//	Origin:  ":",
	//	Encode:  "%3a",
	//	Replace: "%3a",
	//},
	//{
	//	Origin:  "'",
	//	Encode:  "%27",
	//	Replace: "%27",
	//},
	//{
	//	Origin:  "\"",
	//	Encode:  "%22",
	//	Replace: "%22",
	//},
	//{
	//	Origin:  ",",
	//	Encode:  "%2c",
	//	Replace: "%2c",
	//},
	//{
	//	Origin:  "|",
	//	Encode:  "%7c",
	//	Replace: "%7c",
	//},
}

