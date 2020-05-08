import * as React from 'react'
import { StyledWrapper } from './styled'

interface Props {
    action: string
    params: IParams
}

interface IParams {
    MerchantTradeNo: string
    MerchantTradeDate: string
    CheckMacValue: string
    MerchantID: string
    PaymentType: string
    TotalAmount: number
    TradeDesc: string
    ItemName: string
    ReturnURL: string
    ChoosePayment: string
    ClientBackURL: string
    OrderResultURL: string
    EncryptType: number
}

const Container: React.FC<Props> = (props) => {
    return (
        <StyledWrapper>
            <form action={props.action} method="post">
                <input
                    type="text"
                    name="MerchantTradeNo"
                    value={props.params.MerchantTradeNo}
                    readOnly
                />
                <input
                    type="text"
                    name="MerchantTradeDate"
                    value={props.params.MerchantTradeDate}
                    readOnly
                />
                <input
                    type="text"
                    name="CheckMacValue"
                    value={props.params.CheckMacValue}
                    readOnly
                />
                <input
                    type="text"
                    name="MerchantID"
                    value={props.params.MerchantID}
                    readOnly
                />
                <input
                    type="text"
                    name="PaymentType"
                    value={props.params.PaymentType}
                    readOnly
                />
                <input
                    type="text"
                    name="TotalAmount"
                    value={props.params.TotalAmount}
                    readOnly
                />
                <input
                    type="text"
                    name="TradeDesc"
                    value={props.params.TradeDesc}
                    readOnly
                />
                <input
                    type="text"
                    name="ItemName"
                    value={props.params.ItemName}
                    readOnly
                />
                <input
                    type="text"
                    name="ReturnURL"
                    value={props.params.ReturnURL}
                    readOnly
                />
                <input
                    type="text"
                    name="ChoosePayment"
                    value={props.params.ChoosePayment}
                    readOnly
                />
                <input
                    type="text"
                    name="ClientBackURL"
                    value={props.params.ClientBackURL}
                    readOnly
                />
                <input
                    type="text"
                    name="OrderResultURL"
                    value={props.params.OrderResultURL}
                    readOnly
                />
                <input
                    type="text"
                    name="EncryptType"
                    value={props.params.EncryptType}
                    readOnly
                />
                <input type="submit" value="送出" />
            </form>
        </StyledWrapper>
    )
}

export default Container
