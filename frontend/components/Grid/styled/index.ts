import styled from 'styled-components'

export const StyledWrapper = styled.section<any>`
    display: flex;
    background: #00f;
    margin: 0 ${(props) => (props.gutter * -1) / 2}px;
    .ec-row {
        padding: 0 ${(props) => props.gutter / 2}px;
    }
`

StyledWrapper.defaultProps = {
    gutter: 0,
}

export const Col = styled.div<any>`
    width: ${(props) => (props.span / 24) * 100}%;
    text-align: center;
    div {
        background: #ccc;
    }
`
Col.defaultProps = {
    span: 1,
}
