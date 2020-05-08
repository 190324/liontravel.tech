import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import { StyledWrapper } from '@styled/product/show'
import Breadcrumb from '@components/Breadcrumb'
import ImageViewer from '@components/ImageViewer'
import Button from '@components/Button'
import Quantity from '@components/Quantity'

import { QUERY_PRODUCT } from '@graphql/product'
import { MUTATION_CART } from '@graphql/cart'

const { Fragment } = React

const breadcrumbItems = [
    {
        name: 'Home',
    },
    {
        name: '電玩遊戲',
    },
    {
        name: '任天堂Switch專區',
    },
]

const Page = () => {
    const router = useRouter()
    const { loading, error, data } = useQuery(QUERY_PRODUCT, {
        variables: { no: router.query.no },
    })
    const [mutationCart] = useMutation(MUTATION_CART)

    const clickAddCart = () => {
        console.log('clik')
        mutationCart({
            variables: {
                product_no: data?.product?.data?.no,
                qty: 12,
            },
        })
    }

    return (
        <StyledWrapper>
            <Breadcrumb items={breadcrumbItems} seperate="\" />
            <div className="content">
                <div className="intro">
                    <div className="images">
                        <ImageViewer
                            images={[
                                '//via.placeholder.com/120x120',
                                '//via.placeholder.com/120x121',
                                '//via.placeholder.com/120x122',
                                '//via.placeholder.com/120x123',
                                '//via.placeholder.com/120x124',
                            ]}
                        />
                    </div>
                    <div className="basic">
                        <h1>{data?.product?.data?.name}</h1>
                        <div
                            className="brief"
                            dangerouslySetInnerHTML={{
                                __html: data?.product?.data?.brief,
                            }}
                        />
                        <div className="price">
                            NT{' '}
                            <span className="primaryColor">
                                <b>
                                    {data?.product?.data?.sale_price.toLocaleString()}
                                </b>
                            </span>
                        </div>
                        <div className="qty">
                            <Quantity />
                        </div>
                        <div>
                            <Button bg="secondary" onClick={clickAddCart}>
                                加入購物車
                            </Button>{' '}
                            <Button
                                bg="primary"
                                color="white"
                                onClick={clickAddCart}
                            >
                                立即結帳
                            </Button>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </StyledWrapper>
    )
}

export default withApollo(Page)
