import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StyledWrapper } from './styled'

const Component = (props) => {
    const router = useRouter()

    return (
        <StyledWrapper
            className={`${props.className} pointer`}
            onClick={() => {
                router.push('/product/[no]', '/product/PD001')
            }}
        >
            <div className="imgWrap">
                <img src="/static/images/switch.jpg" />
            </div>
            <div className="title">
                <Link href={`/product/[no]`} as={`/product/PD001`}>
                    <a>Switch《集合啦！動物森友會》特別版主機</a>
                </Link>
            </div>
            <div className="price">
                NT{' '}
                <span className="primaryColor">
                    <b>9,780</b>
                </span>
            </div>
        </StyledWrapper>
    )
}

export default Component
