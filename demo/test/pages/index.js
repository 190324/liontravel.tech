import Header from "../components/Header";

const Page = ({ name }) => {
  return (
    <>
      <Header />
      <p>Welcome to {name}!!</p>
    </>
  );
};

// export async function getStaticProps() {
//   const res = await fetch("https://www.omdbapi.com/?i=tt0076759");
//   const json = await res.json();
//   console.log("getStaticProps...", Date.now());
//   return {
//     props: {
//       name: json.Error,
//     },
//   };
// }

// export async function getServerSideProps(context) {
//   const res = await fetch("https://www.omdbapi.com/?i=tt0076759");
//   const json = await res.json();
//   console.log("getStaticProps...", Date.now());
//   console.log("getStaticProps...", Date.now());
//   return {
//     props: {
//       name: json.Error,
//     }, // will be passed to the page component as props
//   }
// }

/**
 * 首次載入會由 Server Render
 * 載入後的路由 Client Render
 */
Page.getInitialProps = async ctx => {
    const res = await fetch('https://www.omdbapi.com/?i=tt0076759')
    const json = await res.json()
    console.log("getInitialProps...", Date.now())
    return { name: json.Error }
}

export default Page;
