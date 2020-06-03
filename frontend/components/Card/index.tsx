import * as React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import { StyledWrapper } from './styled'
import { useTheme } from 'styled-components'

const RoughNotation: any = dynamic(
    () => import('react-rough-notation').then((mod) => mod.RoughNotation),
    {
        ssr: false,
    }
)

interface Props {
    className?: string
    no: string
    title: string
    sale_price: string
    list_price?: string
    image: string
}

const Component: React.FC<Props> = (props) => {
    const theme = useTheme()
    const router = useRouter()
    const isAmp = useAmp()
    const [isNotation, setIsNotation] = React.useState(false)

    return (
        <StyledWrapper
            className={`${props?.className} pointer`}
            onClick={() => {
                router.push('/[no]', `/${props.no}`)
            }}
            onMouseEnter={() => setIsNotation(true)}
            onMouseLeave={() => setIsNotation(false)}
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
                    <a>
                        <RoughNotation
                            type="highlight"
                            show={isNotation}
                            color={theme.colors.primary}
                        >
                            {props.title}
                        </RoughNotation>
                    </a>
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
