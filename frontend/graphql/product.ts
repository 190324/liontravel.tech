import gql from 'graphql-tag'

export const QUERY_PRODUCTS = gql`
    query products {
        products {
            code
            msg
            data {
                edges {
                    no
                    name
                    list_price
                    sale_price
                    qty
                }
            }
        }
    }
`

export const QUERY_PRODUCT = gql`
    query product($no: String!) {
        product(no: $no) {
            code
            msg
            data {
                no
                name
                brief
                list_price
                sale_price
                qty
            }
        }
    }
`

export const MUTATION_PRODUCT = gql`
    mutation MUTATION_PRODUCT($input: I_Product!, $no: String) {
        product(input: $input, no: $no) {
            code
            msg
        }
    }
`
