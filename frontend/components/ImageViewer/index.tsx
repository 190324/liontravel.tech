import * as React from 'react'
import { StyledWrapper, StyledUlWrapper } from './styled'

const { useRef, useEffect, useState } = React

interface Props {
    images: string[]
}

const Component: React.FC<Props> = (props) => {
    const viewerRef = useRef(null)
    const [showImageIndex, setShowImageIndex] = useState(0)

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

    return (
        <StyledWrapper>
            <div className="viewer">
                <img
                    src={`${
                        props.images.length > 0
                            ? props.images[showImageIndex]
                            : '//via.placeholder.com/512'
                    }`}
                    alt=""
                />
            </div>

            {props.images.length > 0 ? (
                <div className="imagesWrap">
                    <div className="ctlPrev" onClick={clickPrev}>
                        ◀
                    </div>
                    <StyledUlWrapper ref={viewerRef}>
                        {props.images.map((image, key) => {
                            return (
                                <li
                                    key={key}
                                    onClick={() => {
                                        setShowImageIndex(key)
                                    }}
                                >
                                    <img src={image} alt="" />
                                </li>
                            )
                        })}
                    </StyledUlWrapper>
                    <div className="ctlNext" onClick={clickNext}>
                        ▶
                    </div>
                </div>
            ) : null}
        </StyledWrapper>
    )
}

export default Component
