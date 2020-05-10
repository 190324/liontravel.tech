import gql from 'graphql-tag'

export const QUERY_ORDERS = gql`
    query orders {
        orders {
            code
            msg
            data {
                edges {
                    no
                }
            }
        }
    }
`

export const MUTATION_ORDER = gql`
    mutation MUTATION_ORDER($input: I_Order!) {
        order(input: $input) {
            code
            msg
            data {
                uri
                params {
                    MerchantTradeNo
                    MerchantTradeDate
                    CheckMacValue
                    MerchantID
                    PaymentType
                    TotalAmount
                    TradeDesc
                    ItemName
                    ReturnURL
                    ChoosePayment
                    ClientBackURL
                    OrderResultURL
                    EncryptType
                }
            }
        }
    }
`
