import styled from 'styled-components'

export const StyledWrapper = styled.div`
    height: 172px;
    background: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    .inner {
        text-align: center;
        .logo {
            h1 {
                color: #c2c1c1;
                margin: 0;
                padding-bottom: 12px;
            }
        }
        .copyright {
            color: #7a7a7a;
        }
    }
`
