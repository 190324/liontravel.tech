import * as React from 'react'

const Page = () => {
    return (
        <form
            action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
            method="post"
        >
            <input type="text" name="MerchantTradeNo" value="1588419331" />
            <input
                type="text"
                name="MerchantTradeDate"
                value="2020/05/02 19:35:31"
            />
            <input
                type="text"
                name="CheckMacValue"
                value="47ad870b9071ae7c39e859f4d2a491b7741cc3d6ecbe26583baa84699564fd9a"
            />

            <input type="text" name="MerchantID" value="2000132" />
            <input type="text" name="PaymentType" value="aio" />
            <input type="text" name="TotalAmount" value="6666" />
            <input type="text" name="TradeDesc" value="Test Shop" />
            <input
                type="text"
                name="ItemName"
                value="Switch 9780 元 X2#PS4 PRO 11000 元 X1"
            />
            <input
                type="text"
                name="ReturnURL"
                value="http://localhost:8888/payment/ecpay/callback"
            />
            <input type="text" name="ChoosePayment" value="Credit" />

            <input
                type="text"
                name="ClientBackURL"
                value="http://localhost:3000/payment/finish"
            />
            <input
                type="text"
                name="OrderResultURL"
                value="http://localhost:3000/payment/finish"
            />
            <input type="text" name="EncryptType" value="1" />
            <input type="submit" value="送出" />
        </form>
    )
}

export default Page
