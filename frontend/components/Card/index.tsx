import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StyledWrapper } from './styled'

interface Props {
    className?: string
    no: string
    title: string
    price: string
}

const Component: React.FC<Props> = (props) => {
    const router = useRouter()

    return (
        <StyledWrapper
            className={`${props?.className} pointer`}
            onClick={() => {
                router.push('/product/[no]', `/product/${props.no}`)
            }}
        >
            <div className="imgWrap">
                <img src="/static/images/switch.jpg" />
            </div>
            <div className="title">
                <Link href={`/product/[no]`} as={`/product/${props.no}`}>
                    <a>{props.title}</a>
                </Link>
            </div>
            <div className="price">
                NT{' '}
                <span className="primaryColor">
                    <b>{props?.price?.toLocaleString()}</b>
                </span>
            </div>
        </StyledWrapper>
    )
}

export default Component
