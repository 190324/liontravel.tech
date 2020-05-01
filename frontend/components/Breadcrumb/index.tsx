import * as React from 'react'
import { StyledWrapper } from './styled'

interface Props {
    items: any
    seperate: string
}

const Component = (props) => {
    const itemsCount = props.items.length

    return (
        <StyledWrapper>
            {props.items.map((item, key) => {
                return (
                    <React.Fragment key={key}>
                        <span>{item.name}</span>
                        {itemsCount - 1 != key ? (
                            <span> {props.seperate} </span>
                        ) : null}
                    </React.Fragment>
                )
            })}
        </StyledWrapper>
    )
}

export default Component
