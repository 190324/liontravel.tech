import * as React from 'react'
import { StyledWrapper, StyledUlWrapper } from './styled'

const { useRef, useEffect, useState } = React

interface Props {
    images: string[]
}

const Component: React.FC<Props> = (props) => {
    const perSize = 4
    const viewerRef = useRef(null)
    const [addCount, setAddCount] = useState(0)

    const clickNext = () => {
        let moveLeft =
            viewerRef.current.scrollLeft + viewerRef.current.offsetWidth
        viewerRef.current.scrollTo({
            top: 0,
            left: moveLeft,
            behavior: 'smooth',
        })
    }

    const clickPrev = () => {
        let moveLeft =
            viewerRef.current.scrollLeft - viewerRef.current.offsetWidth

        if (moveLeft < 0) {
            moveLeft = 0
        }

        viewerRef.current.scrollTo({
            top: 0,
            left: moveLeft,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        setAddCount(perSize - (props.images.length % perSize))
    }, [props.images])

    return (
        <StyledWrapper>
            <div className="viewer">
                <img src="//via.placeholder.com/512x512" alt="" />
            </div>

            <div className="imagesWrap">
                <div className="ctlPrev" onClick={clickPrev}>
                    ◀
                </div>
                <StyledUlWrapper ref={viewerRef}>
                    {props.images.map((image, key) => {
                        return (
                            <li key={key}>
                                <img src={image} alt="" />
                            </li>
                        )
                    })}
                </StyledUlWrapper>
                <div className="ctlNext" onClick={clickNext}>
                    ▶
                </div>
            </div>
        </StyledWrapper>
    )
}

export default Component
