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
    const { loading, error, data } = useQuery(QUERY_CARTS)
    const [mutationOrder, { data: paymentResult }] = useMutation(MUTATION_ORDER)
    const [step, setStep] = useState(1)

    return (
        <StyledWrapper>
            {loading ? (
                <Loading type={LoadingType.container} size={20} />
            ) : (
                <Fragment>
                    <Steps />
                    <div>
                        <div
                            className={`steps step1Wrap ${
                                step == 1 ? 'active' : null
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
                                    setStep(2)
                                }}
                            >
                                下一步
                            </Button>
                        </div>
                        <div
                            className={`steps step2Wrap ${
                                step == 2 ? 'active' : null
                            }`}
                        >
                            寄送資料
                            <Button
                                bg="primary"
                                color="white"
                                display="inline"
                                onClick={() => {
                                    setStep(3)
                                }}
                            >
                                下一步
                            </Button>
                        </div>
                        <div
                            className={`steps step3Wrap ${
                                step == 3 ? 'active' : null
                            }`}
                        >
                            <Button
                                bg="primary"
                                color="white"
                                display="inline"
                                onClick={() => {
                                    setStep(4)
                                    mutationOrder()
                                }}
                            >
                                結帳
                            </Button>
                        </div>
                        <div
                            className={`steps step4Wrap ${
                                step == 4 ? 'active' : null
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
