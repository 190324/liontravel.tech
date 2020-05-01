import styled from 'styled-components'

export const StyledWrapper = styled.div`
    max-width: ${(props) => props.theme.size.laptop};
    margin: 0 auto;
    padding: 20px;
    .content {
        padding: 16px 0;
        .intro {
            display: flex;
            justify-content: space-between;
            .images {
                width: 50%;
            }
            .basic {
                width: calc(50% - 20px);
                h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .brief {
                    padding: 10px 0;
                    color: #222;
                }
                .price {
                    padding: 10px 0;
                    font-size: 22px;
                }
                .qty {
                    padding: 10px 0 30px 0;
                }
            }
        }
    }
`
