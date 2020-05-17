import * as React from 'react'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import Router from 'next/router'
import MemberSubLayout from '@containers/MemberSubLayout'
import { StyledWrapper } from '@styled/sell/product/index'
import Table, { IColumns } from '@components/Table'
import Loading, { LoadingType } from '@components/Loading'
import Button from '@components/Button'

import { QUERY_PRODUCTS } from '@graphql/product'

const { useEffect, useState } = React
const columns: IColumns[] = [
    {
        dataIndex: 'no',
        title: '產品編號',
        render: (value) => {
            return (
                <Link href={`/product/${value.no}`}>
                    <a>{value.no}</a>
                </Link>
            )
        },
    },
    { dataIndex: 'name', title: '名稱' },
    { dataIndex: 'list_price', title: '定價' },
    { dataIndex: 'sale_price', title: '售價' },
    { dataIndex: 'qty', title: '數量' },
]

const Page = () => {
    const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
        variables: {
            filter: {
                view: 'self-edit',
            },
        },
    })

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        if (data?.products?.code == 200) {
            setDataSource((prev) => {
                return [...data.products.data.edges]
            })
        }
    }, [data])

    return (
        <MemberSubLayout title="產品列表">
            <StyledWrapper>
                <div className="func">
                    <Button
                        bg="primary"
                        color="white"
                        display="inline"
                        onClick={() => {
                            Router.push('/sell/product/mutation')
                        }}
                    >
                        新增
                    </Button>
                </div>

                {loading ? (
                    <Loading type={LoadingType.container} size={20} />
                ) : (
                    <Table columns={columns} dataSource={dataSource} />
                )}
            </StyledWrapper>
        </MemberSubLayout>
    )
}

export default withApollo(withAuth(Page), { ssr: false })
