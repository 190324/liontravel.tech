import * as React from 'react'
import Link from 'next/link'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import MemberSubLayout from '@containers/MemberSubLayout'
import { StyledWrapper } from '@styled/sell/product/index'

import Grid from '@components/Grid'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const { Fragment } = React

import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'

const NOTIFICATION = gql`
    subscription notification {
        notification
    }
`

const Page = () => {
    const { data, loading } = useSubscription(NOTIFICATION)

    console.log(data)

    return (
        <MemberSubLayout title="賣場設定">
            {!loading && data?.notification}
        </MemberSubLayout>
    )
}

// export default withApollo(withAuth(Page), { ssr: false })
export default withApollo(Page)
