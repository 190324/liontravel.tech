import styled from 'styled-components'

export const StyledWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
    .imgWrap {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        width: 120px;
        height: 120px;
        img {
            width: inherit;
        }
    }
    .infoWrap {
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-grow: 1;
    }
    .mutationWrap {
        display: flex;
        align-items: center;
    }
`
