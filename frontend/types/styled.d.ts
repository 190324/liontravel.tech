import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        size: {
            [name: string]: string
        }
        colors: {
            [name: string]: string
        }
    }
}
