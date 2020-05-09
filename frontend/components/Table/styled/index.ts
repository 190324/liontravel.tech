import styled from 'styled-components'

export const StyledWrapper = styled.table<any>`
    width: 100%;
    border-collapse: collapse;
    td,
    th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #ddd;
    }

    th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: ${(props) => props.theme.colors.success};
        color: white;
    }
`
