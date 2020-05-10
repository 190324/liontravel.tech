import * as React from 'react'
import { StyledWrapper } from './styled'
import Input from '@components/Input'

const { useEffect, useState } = React

interface Props {
    onPassData: (data: IData) => void
}

interface IData {
    user_name: string
    user_phone: string
    user_address: string
    receiver_name: string
    receiver_phone: string
    receiver_address: string
}

const Container: React.FC<Props> = (props) => {
    const [data, setData] = useState<IData>({
        user_name: '',
        user_phone: '',
        user_address: '',
        receiver_name: '',
        receiver_phone: '',
        receiver_address: '',
    })
    const [same, setSame] = useState(false)

    const onChange = (
        value: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setData((prev) => {
            let name = e.target.name
            return { ...prev, [name]: value }
        })
    }

    const onSame = () => {
        setSame((prev) => {
            let isSame = !prev

            if (isSame) {
                setData((prev) => {
                    return {
                        ...prev,
                        receiver_name: prev.user_name,
                        receiver_phone: prev.user_phone,
                        receiver_address: prev.user_address,
                    }
                })
            }
            return isSame
        })
    }

    useEffect(() => {
        props.onPassData(data)
    }, [data])

    return (
        <StyledWrapper onSubmit={() => false}>
            <Input
                type="text"
                name="user_name"
                label="購買人"
                value={data.user_name}
                placeholder="購買人"
                className="item"
                onChange={(value, e) => {
                    onChange(value, e)
                }}
            />
            <Input
                type="text"
                name="user_phone"
                label="購買人電話"
                value={data.user_phone}
                placeholder="購買人電話"
                className="item"
                onChange={(value, e) => {
                    onChange(value, e)
                }}
            />
            <Input
                type="text"
                name="user_address"
                label="購買人地址"
                value={data.user_address}
                placeholder="購買人地址"
                className="item"
                onChange={(value, e) => {
                    onChange(value, e)
                }}
            />
            <div className="item">
                <input
                    type="checkbox"
                    value="1"
                    onChange={onSame}
                    checked={same}
                />{' '}
                收件人資料同購買人
            </div>
            <Input
                type="text"
                name="receiver_name"
                label="收件人"
                value={data.receiver_name}
                placeholder="收件人"
                className="item"
                onChange={(value, e) => {
                    onChange(value, e)
                }}
            />
            <Input
                type="text"
                name="receiver_phone"
                label="收件人電話"
                value={data.receiver_phone}
                placeholder="收件人電話"
                className="item"
                onChange={(value, e) => {
                    onChange(value, e)
                }}
            />
            <Input
                type="text"
                name="receiver_address"
                label="收件人地址"
                value={data.receiver_address}
                placeholder="收件人地址"
                className="item"
                onChange={(value, e) => {
                    onChange(value, e)
                }}
            />
        </StyledWrapper>
    )
}

export default Container
