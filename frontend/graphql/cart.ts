import gql from 'graphql-tag'

export const QUERY_CARTS = gql`
    query carts {
        carts {
            code
            msg
            data {
                edges {
                    no
                    qty
                    product {
                        no
                        name
                        sale_price
                        images {
                            path
                        }
                    }
                }
            }
        }
    }
`

export const MUTATION_CART = gql`
    mutation MUTATION_CART($product_no: String!, $qty: Int!) {
        cart(product_no: $product_no, qty: $qty) {
            code
            msg
        }
    }
`

export const MUTATION_DELCART = gql`
    mutation MUTATION_DELCART($no: String!) {
        delCart(no: $no) {
            code
            msg
        }
    }
`
