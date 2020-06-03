import styled from 'styled-components'

export const StyledWrapper = styled.div`
    margin-top: 40px;
    height: 172px;
    background: ${(props) => props.theme.colors.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
        text-align: center;
        color: #fff;
        .logo {
            h1 {
                margin: 0;
                padding-bottom: 12px;
            }
        }
    }
`
