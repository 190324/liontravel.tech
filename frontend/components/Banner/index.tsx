import * as React from 'react'
import { StyledWrapper } from './styled'

interface Props {
    bg?: string
    display?: string
    color?: string
    onClick?: () => void
    disabled?: boolean
    className?: string
}

const Component: React.FC<Props> = (props) => {
    return (
        <StyledWrapper>
            <div className="mainWrap">
                <div className="slogan">
                    <img src="https://i.picsum.photos/id/426/1600/900.jpg" />
                </div>
                <div className="labelWrap">
                    <div className="label subLabel">
                        <span>精選商品</span>
                    </div>
                    <div className="label subject">
                        <span>館長強力推薦熱銷 TOP 2</span>
                    </div>
                </div>
                <div className="recommandWrap">
                    {Array.from({ length: 2 }).map((_, item) => {
                        return (
                            <div key={`${item}`} className="inner">
                                <div className="item">
                                    <img
                                        src="https://picsum.photos/360/144"
                                        alt=""
                                    />
                                    <div className="label category">任天堂</div>
                                    <div className="label name">
                                        Switch 組合包
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </StyledWrapper>
    )
}

export default Component
