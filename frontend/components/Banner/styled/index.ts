import styled from 'styled-components'
import { device } from '@styled/_app'

export const StyledWrapper = styled.div<any>`
    .mainWrap {
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
        .slogan {
            padding-bottom: 56.25%;
            // background: url(https://i.picsum.photos/id/426/1600/900.jpg);
            // background-size: cover;
            position: relative;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .labelWrap {
            margin-top: -18px;
            position: relative;
            z-index: 2;
            .label {
                &.subLabel {
                    font-size: 18px;
                    padding: 4px 0;
                }
                &.subject {
                    font-size: 26px;
                    padding-bottom: 5px;
                }
                span {
                    background: #000;
                    color: #fff;
                    padding: 0 5px;
                }
            }
        }
        .recommandWrap {
            box-sizing: border-box;
            .inner {
                padding: 8px 0;
                .item {
                    position: relative;
                    padding-bottom: 40%;
                    &:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        display: block;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.2);
                        z-index: 1;
                    }
                    img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .label {
                        position: absolute;
                        left: 20px;
                        color: #fff;
                        z-index: 2;
                        &.category {
                            top: 10px;
                            font-size: 18px;
                        }
                        &.name {
                            top: 35px;
                            font-size: 26px;
                        }
                    }
                }
            }
        }
    }

    @media ${device.laptop} {
        position: relative;
        &:before {
            content: '';
            display: block;
            width: 100%;
            height: calc(100% - 5px);
            background: ${(props) => props.theme.colors.primary};
            position: absolute;
            bottom: -20px;
        }
        .mainWrap {
            width: calc(75% - 75% / 4.44);
            position: relative;
            .slogan {
                padding-bottom: 31.67%;
                img {
                    left: calc(100% / 4 / 2 * -1);
                }
            }
            .labelWrap {
                display: inline-block;
                width: calc(100% / 3);
                position: absolute;
                right: calc(100% / 4 / 2 * -1);
                bottom: calc(68% + 12px);
                .label {
                    &.subLabel {
                        font-size: 12px;
                    }
                    &.subject {
                        font-size: 16px;
                    }
                }
            }
            .recommandWrap {
                position: absolute;
                width: calc(100% / 3);
                right: calc(100% / 4 / 2 * -1);
                bottom: -16px;
                .inner {
                    width: 100%;
                    padding: 5px 0;
                    .item {
                        padding-bottom: 34%;
                        .label {
                            &.category {
                                top: 10%;
                                font-size: 12px;
                            }
                            &.name {
                                top: 30%;
                                font-size: 18px;
                            }
                        }
                    }
                }
            }
        }
    }
`

StyledWrapper.defaultProps = {}
