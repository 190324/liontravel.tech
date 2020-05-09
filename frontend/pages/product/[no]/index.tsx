import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks'
import Router, { useRouter } from 'next/router'
import { StyledWrapper } from '@styled/product/show'
import Breadcrumb from '@components/Breadcrumb'
import ImageViewer from '@components/ImageViewer'
import Button from '@components/Button'
import Quantity from '@components/Quantity'

import { STORAGE_PATH, QUERY_PRODUCT } from '@graphql/product'
import { MUTATION_CART } from '@graphql/cart'

const { useEffect, useState } = React

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
    const [qty, setQty] = useState(1)
    const [images, setImages] = useState([])
    const { loading, error, data } = useQuery(QUERY_PRODUCT, {
        variables: { no: router.query.no },
    })
    const [mutationCart] = useMutation(MUTATION_CART)

    const clickAddCart = (isCheckout = false) => {
        let result = mutationCart({
            variables: {
                product_no: data?.product?.data?.no,
                qty: qty,
            },
        })

        result.then((rs) => {
            switch (rs.data.cart.code) {
                case 200:
                    if (isCheckout) {
                        Router.push('/cart')
                    }
                    break
                case 401:
                    alert('請登入會員')
                    break
                default:
                    break
            }
        })
    }

    useEffect(() => {
        if (data?.product?.code == 200) {
            let imgs = []
            data.product.data.images.map((image) => {
                imgs.push(
                    `${STORAGE_PATH}${data.product.data.no}/${image.path}`
                )
            })
            setImages(imgs)
        }
    }, [data])

    return (
        <StyledWrapper>
            <Breadcrumb items={breadcrumbItems} seperate="\" />
            <div className="content">
                <div className="intro">
                    <div className="images">
                        <ImageViewer images={images} />
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
                            <Quantity
                                value={qty}
                                onChange={(value) => {
                                    setQty(value)
                                }}
                            />
                        </div>
                        <div>
                            <Button bg="secondary" onClick={clickAddCart}>
                                加入購物車
                            </Button>{' '}
                            <Button
                                bg="primary"
                                color="white"
                                onClick={() => clickAddCart(true)}
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
