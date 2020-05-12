import Link from 'next/link'
import Router, {useRouter} from 'next/router'

const Component = ({name}) => {

    const router = useRouter()

    const onClickIndexShallow = () => {
        Router.push("/?page=1", undefined, {shallow: true})
    }

    React.useEffect(()=> {
        console.log("didmount!!");
    }, [router.query.page])

    return (
        <ul>
            <li>
                <Link href="/">
                    <a>Index</a>
                </Link>
            </li>
            <li>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </li>
            <li onClick={onClickIndexShallow}>
                Index Shallow
            </li>
        </ul>
    )
}

  
export default Component