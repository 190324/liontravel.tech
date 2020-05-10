import * as React from 'react'
import { StyledWrapper, StyledInputWrap, StyledLabelWrap } from './styled'

interface Props {
    type: string
    name: string
    value?: string
    label?: string
    placeholder?: string
    readonly?: boolean
    className?: string
    onChange: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void
}

const Component: React.FC<Props> = (props) => {
    return (
        <StyledWrapper className={props.className}>
            {props.label && <StyledLabelWrap>{props.label}</StyledLabelWrap>}
            <StyledInputWrap
                type={props.type}
                name={props.name}
                value={props.value ? props.value : ''}
                placeholder={props.placeholder}
                onChange={(e) => {
                    e.persist()
                    if (props.onChange) {
                        let target = e
                        props.onChange(e.target.value, target)
                    }
                }}
                readonly={props.readonly ? props.readonly : false}
            ></StyledInputWrap>
        </StyledWrapper>
    )
}

export default Component
