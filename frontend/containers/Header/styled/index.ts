import styled from 'styled-components'

export const StyledWrapper = styled.div`
    height: 54px;
    display: flex;
    justify-content: space-between;
    background: ${(props) => props.theme.colors.primary};
    .inner {
        display: flex;
        align-items: center;
        .item {
            padding: 0 12px;
            display: inline-flex;
            &.logo {
                color: #fff;
                font-weight: bold;
                font-size: 20px;
                padding: 0 4px;
            }
        }
    }
`
