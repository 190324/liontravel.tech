import * as React from 'react'
import { StyledWrapper } from './styled'

interface Props {
    items: IItem[]
    activeIndex: number
}

interface IItem {
    name: string
    onClick: () => {}
}

const Component = (props) => {
    return (
        <StyledWrapper className={props.className}>
            {props.items.map((row, key) => {
                return (
                    <li
                        key={key}
                        className={`${
                            props.activeIndex == key ? 'active' : ''
                        }`}
                    >
                        <div className="serial">{++key}</div>
                        <div className="name">{row.name}</div>
                    </li>
                )
            })}
        </StyledWrapper>
    )
}

export default Component
