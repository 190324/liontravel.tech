import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import { StyledWrapper } from '@styled/sell/product/mutation'
import { useMutation } from '@apollo/react-hooks'
import MemberSubLayout from '@containers/MemberSubLayout'
import Input from '@components/Input'
import Button from '@components/Button'

import { MUTATION_PRODUCT } from '@graphql/product'

const { useState } = React

const Page = () => {
    const [mutationProduct, { data }] = useMutation(MUTATION_PRODUCT)

    const [inputProduct, setInputProduct] = useState({
        name: null,
        sale_price: null,
        qty: null,
    })

    const clickSave = () => {
        let result = mutationProduct({
            variables: {
                input: {
                    ...inputProduct,
                },
            },
        })

        result.then((rs) => {
            if (rs.data.product.code == 200) {
                alert('新增成功')
            }
        })
    }

    return (
        <MemberSubLayout title="新增商品">
            <StyledWrapper>
                <form onSubmit={() => false}>
                    <div className="item">
                        <Input
                            type="text"
                            name="name"
                            placeholder="商品名稱"
                            onChange={(value) => {
                                setInputProduct((prev) => {
                                    return { ...prev, name: value }
                                })
                            }}
                        />
                    </div>

                    <div className="item">
                        <Input
                            type="text"
                            name="sale_price"
                            placeholder="價格"
                            onChange={(value) => {
                                setInputProduct((prev) => {
                                    return { ...prev, sale_price: value }
                                })
                            }}
                        />
                    </div>
                    <div className="item">
                        <Input
                            type="text"
                            name="qty"
                            placeholder="數量"
                            onChange={(value) => {
                                setInputProduct((prev) => {
                                    return { ...prev, qty: value }
                                })
                            }}
                        />
                    </div>
                    <div className="item">
                        <Button
                            bg="primary"
                            color="white"
                            display="block"
                            onClick={clickSave}
                        >
                            儲存
                        </Button>
                    </div>
                </form>
            </StyledWrapper>
        </MemberSubLayout>
    )
}

export default withApollo(withAuth(Page), { ssr: false })
