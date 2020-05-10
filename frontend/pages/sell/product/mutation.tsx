import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import { StyledWrapper } from '@styled/sell/product/mutation'
import Router from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import MemberSubLayout from '@containers/MemberSubLayout'
import Input from '@components/Input'
import Button from '@components/Button'
import { Editor } from '@tinymce/tinymce-react'

import { MUTATION_PRODUCT } from '@graphql/product'

const { useState } = React

const Page = () => {
    const [mutationProduct, { data }] = useMutation(MUTATION_PRODUCT)

    const [inputProduct, setInputProduct] = useState({
        name: null,
        sale_price: null,
        qty: null,
        images: null,
        brief: null,
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
                Router.push(`/product/${rs.data.product.data.no}`)
            }
        })
    }

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content)
        setInputProduct((prev) => {
            return { ...prev, brief: content }
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
                            value={inputProduct.name}
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
                            value={inputProduct.sale_price}
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
                            value={inputProduct.qty}
                            placeholder="數量"
                            onChange={(value) => {
                                setInputProduct((prev) => {
                                    return { ...prev, qty: value }
                                })
                            }}
                        />
                    </div>
                    <Editor
                        apiKey={process.env.TINYMCE_API_KEY}
                        init={{
                            height: 300,
                            menubar: false,
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
                        }}
                        onEditorChange={handleEditorChange}
                    />
                    <input
                        type="file"
                        multiple
                        onChange={({ target: { validity, files } }) =>
                            setInputProduct((prev) => {
                                return {
                                    ...prev,
                                    images: files,
                                }
                            })
                        }
                    />
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
