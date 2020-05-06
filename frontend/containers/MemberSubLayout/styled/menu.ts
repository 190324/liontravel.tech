import styled from 'styled-components'

export const StyledULContainer = styled.ul`
    margin: 0;
    padding: 16px;
    box-sizing: border-box;
    li {
        list-style: none;
    }
    .subItems {
        padding-left: 16px;
        li {
            padding: 4px 0;
            &:last-child {
                padding: 4px 0 10px 0;
            }
            a {
                text-decoration: none;
            }
        }
    }
`
