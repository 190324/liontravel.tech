import styled from 'styled-components'

export const StyledWrapper = styled.div<any>`
    background: ${(props) => props.theme.colors.info};
    display: inline-block;
    width: 100%
    border-radius: 8px;
    padding: 12px;
    box-sizing: border-box;
    .imgWrap {
        img {
            width: 100%;
        }
    }
    .title a {
        color: #222;
        padding: 10px 0;
        text-decoration: none;
    }
    .price {
        .listPrice b {
            text-decoration: line-through;
        }
    }
`
