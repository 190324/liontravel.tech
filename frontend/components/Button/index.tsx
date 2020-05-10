import * as React from 'react'
import { StyledWrapper } from './styled'

interface Props {
    bg?: string
    display?: string
    color?: string
    onClick?: () => void
    disabled?: boolean
    className?: string
}

const Component: React.FC<Props> = (props) => {
    return (
        <StyledWrapper
            type="button"
            bg={props.bg}
            className={props.className}
            color={props.color}
            display={props.display}
            onClick={() => {
                if (props.onClick) {
                    props.onClick()
                }
            }}
            disabled={props.disabled ? props.disabled : false}
        >
            {props.children}
        </StyledWrapper>
    )
}

export default Component
