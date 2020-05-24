import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { StyledWrapper } from '@styled/cart/index'
import Loading, { LoadingType } from '@components/Loading'
import Button from '@components/Button'
import Steps from '@components/Steps'

import Checkout from '@containers/CartStep/Checkout'
import CartList from '@containers/CartStep/CartList'
import DeliveryData from '@root/containers/CartStep/DeliveryData'

import { MUTATION_ORDER } from '@graphql/order'
import { QUERY_CARTS } from '@graphql/cart'

const { Fragment, useState } = React

const Page = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_CARTS, {
        fetchPolicy: 'no-cache',
    })
    const [mutationOrder, { data: paymentResult }] = useMutation(MUTATION_ORDER)
    const [stepIndex, setStepIndex] = useState(0)
    const [orderData, setOrderData] = useState(null)

    const stepItems = [
        { name: '購物車' },
        { name: '配送資訊' },
        { name: '確認訂單' },
        { name: '結帳' },
        { name: '完成' },
    ]

    const onPassData = (data: any) => {
        setOrderData(data)
    }

    return (
        <StyledWrapper>
            {loading ? (
                <Loading type={LoadingType.container} size={20} />
            ) : (
                <Fragment>
                    <div className="stepsWrap">
                        <Steps items={stepItems} activeIndex={stepIndex} />
                    </div>

                    <div>
                        <div
                            className={`stepWrap step1Wrap ${
                                stepIndex == 0 ? 'active' : null
                            }`}
                        >
                            {stepIndex == 0 && (
                                <CartList
                                    data={data?.carts?.data?.edges}
                                    onRefetch={() => refetch()}
                                />
                            )}
                            {data?.carts?.data?.edges.length > 0 ? (
                                <div className="switchPageWrap">
                                    <Button
                                        bg="primary"
                                        color="white"
                                        display="inline"
                                        onClick={() => {
                                            setStepIndex(1)
                                        }}
                                    >
                                        下一步
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                        <div
                            className={`stepWrap step2Wrap ${
                                stepIndex == 1 ? 'active' : null
                            }`}
                        >
                            {stepIndex == 1 && (
                                <DeliveryData onPassData={onPassData} />
                            )}

                            <div className="switchPageWrap">
                                <Button
                                    bg="primary"
                                    color="white"
                                    display="inline"
                                    onClick={() => {
                                        setStepIndex(0)
                                    }}
                                >
                                    上一步
                                </Button>
                                <Button
                                    bg="primary"
                                    color="white"
                                    display="inline"
                                    onClick={() => {
                                        setStepIndex(2)
                                    }}
                                >
                                    下一步
                                </Button>
                            </div>
                        </div>
                        <div
                            className={`stepWrap step3Wrap ${
                                stepIndex == 2 ? 'active' : null
                            }`}
                        >
                            <div className="switchPageWrap">
                                <Button
                                    bg="primary"
                                    color="white"
                                    display="inline"
                                    onClick={() => {
                                        setStepIndex(1)
                                    }}
                                >
                                    上一步
                                </Button>
                                <Button
                                    bg="primary"
                                    color="white"
                                    display="inline"
                                    onClick={() => {
                                        setStepIndex(3)
                                        let result = mutationOrder({
                                            variables: {
                                                input: orderData,
                                            },
                                        })
                                        result.then((rs) => {
                                            if (rs.data.order.code != 200) {
                                                alert('資料異常，請稍後再試！')
                                            }
                                        })
                                    }}
                                >
                                    下一步
                                </Button>
                            </div>
                        </div>
                        <div
                            className={`stepWrap step4Wrap ${
                                stepIndex == 3 ? 'active' : null
                            }`}
                        >
                            {paymentResult && (
                                <Checkout
                                    action={paymentResult.order?.data?.uri}
                                    params={paymentResult.order?.data?.params}
                                />
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </StyledWrapper>
    )
}

export default withApollo(withAuth(Page), { ssr: false })
