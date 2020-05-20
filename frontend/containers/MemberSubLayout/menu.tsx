import * as React from 'react'
import Link from 'next/link'
import { StyledULContainer } from './styled/menu'

const { Fragment } = React

const menuList = [
    {
        name: '我的帳戶',
        items: [
            { name: '會員資料', url: '/member', isRoutePush: true },
            { name: '密碼變更', url: '/member/password', isRoutePush: true },
        ],
    },
    {
        name: '訂單管理',
        items: [
            { name: '歷史訂單', url: '/member/order', isRoutePush: true },
            { name: '我的最愛', url: '/member', isRoutePush: true },
            { name: '購物車', url: '/member', isRoutePush: true },
        ],
    },
    {
        name: '我的賣場',
        items: [
            { name: '賣場設定', url: '/seller', isRoutePush: true },
            { name: '分類設定', url: '/seller/category', isRoutePush: true },
            { name: '商品設定', url: '/seller/product', isRoutePush: true },
            { name: '訂單管理', url: '/seller/product', isRoutePush: true },
        ],
    },
]

const Container: React.FC = (props) => {
    return (
        <StyledULContainer>
            {menuList.map((item, key) => {
                return (
                    <Fragment key={key}>
                        <li>{item.name}</li>
                        <li>
                            <ul className="subItems">
                                {item.items.map((subItem, subKey) => {
                                    return (
                                        <li key={subKey}>
                                            <Link href={subItem.url}>
                                                <a>{subItem.name}</a>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    </Fragment>
                )
            })}
        </StyledULContainer>
    )
}

export default Container
