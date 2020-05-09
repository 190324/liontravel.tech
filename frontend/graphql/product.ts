import gql from 'graphql-tag'

export const STORAGE_PATH = '/static/images/products/'

export const QUERY_PRODUCTS = gql`
    fragment productData on Product {
        no
        name
        list_price
        sale_price
        qty
        images {
            path
        }
    }
    query products($page: Int, $per_page: Int, $order: [String]) {
        products(page: $page, per_page: $per_page, order: $order) {
            code
            msg
            data {
                edges {
                    ...productData
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
                images {
                    path
                }
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
