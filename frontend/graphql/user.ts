import gql from 'graphql-tag'

export const QUERY_ME = gql`
    query ME {
        me {
            code
            msg
        }
    }
`

export const MUTATION_LOGIN = gql`
    mutation LOGIN($input: I_Login) {
        login(input: $input) {
            code
            data {
                access_token
                refresh_token
                token_type
                expires
            }
        }
    }
`
