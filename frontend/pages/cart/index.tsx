import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks'
import { StyledWrapper } from '@styled/cart/index'
import Loading, { LoadingType } from '@components/Loading'
import Button from '@components/Button'
import Steps from '@components/Steps'

import PaymentForm from '@containers/PaymentForm'

import { MUTATION_ORDER } from '@graphql/order'
import { QUERY_CARTS } from '@graphql/cart'

const { Fragment, useState } = React

const Page = () => {
    const { loading, error, data } = useQuery(QUERY_CARTS, {
        fetchPolicy: 'no-cache',
    })
    const [mutationOrder, { data: paymentResult }] = useMutation(MUTATION_ORDER)
    const [stepIndex, setStepIndex] = useState(0)

    const stepItems = [
        { name: '購物車' },
        { name: '配送資訊' },
        { name: '確認訂單' },
        { name: '前往結帳' },
        { name: '完成' },
    ]

    return (
        <StyledWrapper>
            {loading ? (
                <Loading type={LoadingType.container} size={20} />
            ) : (
                <Fragment>
                    <Steps items={stepItems} activeIndex={stepIndex} />
                    <div>
                        <div
                            className={`steps step1Wrap ${
                                stepIndex == 0 ? 'active' : null
                            }`}
                        >
                            {data?.carts?.data?.edges.map((row, key) => {
                                return (
                                    <Fragment key={key}>
                                        {row.product.name}-
                                        {row.product.sale_price}-{row.qty}
                                    </Fragment>
                                )
                            })}
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
                        <div
                            className={`steps step2Wrap ${
                                stepIndex == 1 ? 'active' : null
                            }`}
                        >
                            寄送資料
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
                        <div
                            className={`steps step3Wrap ${
                                stepIndex == 2 ? 'active' : null
                            }`}
                        >
                            <Button
                                bg="primary"
                                color="white"
                                display="inline"
                                onClick={() => {
                                    setStepIndex(3)
                                    let result = mutationOrder()
                                    result.then((rs) => {
                                        if (rs.data.order.code != 200) {
                                            alert('資料異常，請稍後再試！')
                                        }
                                    })
                                }}
                            >
                                結帳
                            </Button>
                        </div>
                        <div
                            className={`steps step4Wrap ${
                                stepIndex == 3 ? 'active' : null
                            }`}
                        >
                            {paymentResult && (
                                <PaymentForm
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
