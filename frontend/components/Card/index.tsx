import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import { StyledWrapper } from './styled'

interface Props {
    className?: string
    no: string
    title: string
    sale_price: string
    list_price?: string
    image: string
}

const Component: React.FC<Props> = (props) => {
    const router = useRouter()
    const isAmp = useAmp()

    return (
        <StyledWrapper
            className={`${props?.className} pointer`}
            onClick={() => {
                router.push('/[no]', `/${props.no}`)
            }}
        >
            <div className="imgWrap">
                {isAmp ? (
                    <amp-img
                        src={props.image}
                        width={'640'}
                        height={'640'}
                        alt={props.title}
                        layout="responsive"
                    />
                ) : (
                    <img src={props.image} alt={props.title} />
                )}
            </div>
            <div className="title">
                <Link href={`/[no]`} as={`/${props.no}`}>
                    <a>{props.title}</a>
                </Link>
            </div>
            <div className="price">
                NT{' '}
                <span className="listPrice">
                    <b>{props?.list_price?.toLocaleString()}</b>
                </span>
                {props?.list_price ? <>&nbsp;&nbsp;</> : null}
                <span className="primaryColor">
                    <b>{props?.sale_price?.toLocaleString()}</b>
                </span>
            </div>
        </StyledWrapper>
    )
}

export default Component
