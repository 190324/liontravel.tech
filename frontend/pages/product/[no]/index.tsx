import * as React from 'react'
import { StyledWrapper } from '@styled/product/show'
import Breadcrumb from '@components/Breadcrumb'
import ImageViewer from '@components/ImageViewer'
import Button from '@components/Button'
import Quantity from '@components/Quantity'

const breadcrumbItems = [
    {
        name: 'Home',
    },
    {
        name: '電玩遊戲',
    },
    {
        name: '任天堂Switch專區',
    },
]

const Page = () => {
    return (
        <StyledWrapper>
            <Breadcrumb items={breadcrumbItems} seperate="\" />
            <div className="content">
                <div className="intro">
                    <div className="images">
                        <ImageViewer />
                    </div>
                    <div className="basic">
                        <h1>
                            【Nintendo
                            任天堂】Switch新版藍紅主機+《曠野之息》+《精選遊戲x4》+《皮套》
                        </h1>
                        <div className="brief">
                            新規格 電池續航增加 全球媒體一致讚譽獲獎無數巔峰作
                            <br />
                            完整收錄8代所有內容及全新模式
                            <br />
                            快投擲愛心將敵人變成同伴 廢棄鬼屋洋樓
                            <br />
                            掃蕩幽靈解救伙伴 中文版
                            <br />
                        </div>
                        <div className="price">
                            NT{' '}
                            <span className="primaryColor">
                                <b>9,780</b>
                            </span>
                        </div>
                        <div className="qty">
                            <Quantity />
                        </div>
                        <div>
                            <Button bg="secondary">加入購物車</Button>{' '}
                            <Button bg="primary" color="white">
                                立即結帳
                            </Button>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </StyledWrapper>
    )
}

export default Page
