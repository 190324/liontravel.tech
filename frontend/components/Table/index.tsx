import * as React from 'react'
import { StyledWrapper } from './styled'

interface Props {
    className?: string
    columns: [IColumns]
    dataSource: [IData]
}

export interface IColumns {
    dataIndex: string
    title: string | JSX.Element
    render?: (value: any) => JSX.Element
}

export interface IData {
    key: string | number
    [index: string]: any
}

const Component = (props) => {
    return (
        <StyledWrapper className={props.className}>
            <thead>
                <tr>
                    {props.columns?.map((row) => {
                        return <th key={row.dataIndex}>{row.title}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {props.dataSource?.map((row, key) => {
                    return (
                        <tr key={key}>
                            {props.columns.map((column) => {
                                let value = row[column.dataIndex] //column.render
                                return (
                                    <td key={`${key}-${column.dataIndex}`}>
                                        {column.render
                                            ? column.render(row)
                                            : value}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </StyledWrapper>
    )
}

export default Component
