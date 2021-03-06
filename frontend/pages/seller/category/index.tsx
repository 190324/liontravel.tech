import * as React from 'react'
import Link from 'next/link'
import { withApollo } from '@lib/withApollo'
import { withAuth } from '@lib/withAuth'
import MemberSubLayout from '@containers/MemberSubLayout'
import { StyledWrapper } from '@styled/sell/product/index'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const { Fragment } = React

// fake data generator
const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex): any => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
})

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250,
})

const Page = () => {
    const [items, setItems] = React.useState([
        { id: '0', content: 'zero' },
        { id: '1', content: 'one' },
        { id: '2', content: 'two' },
        { id: '3', content: 'three' },
    ])

    const onDragEnd = (result) => {
        if (!result.destination) {
            return
        }

        const newItems = reorder(
            items,
            result.source.index,
            result.destination.index
        )

        setItems(newItems)
    }

    return (
        <MemberSubLayout title="分類設定">
            <StyledWrapper>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                {item.content}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </StyledWrapper>
        </MemberSubLayout>
    )
}

export default withApollo(withAuth(Page), { ssr: false })
