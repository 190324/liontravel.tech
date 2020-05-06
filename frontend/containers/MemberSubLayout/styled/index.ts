import styled from 'styled-components'

export const StyledContainer = styled.div`
    max-width: ${(props) => props.theme.size.laptop};
    min-height: calc(var(--vh, 1vh) * 100 - 54px - 172px);
    margin: 0 auto;
    display: flex;
    .memberContent {
        width: calc(100% - 120px);
        padding: 0 30px;
        box-sizing: border-box;
        .title {
            padding: 20px 0;
        }
    }
`
