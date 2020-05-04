import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div`
    max-width: ${(props) => props.theme.size.tablet};
    margin: 0 auto;
    .logout {
        text-align: center;
        font-size: 24px;
        span {
            font-size: 50px;
            animation-name: blink;
            animation-duration: 1.4s;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
            &:nth-child(2) {
                animation-delay: 0.2s;
            }
            &:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes blink {
                0% {
                    opacity: 0.2;
                }
                20% {
                    opacity: 1;
                }
                100% {
                    opacity: 0.2;
                }
            }
        }
    }
`
