import gql from 'graphql-tag'

export const MUTATION_PRODUCT = gql`
    mutation MUTATION_PRODUCT($input: I_Product!, $no: String) {
        product(input: $input, no: $no) {
            code
            msg
        }
    }
`
