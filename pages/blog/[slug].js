import Head from "next/head";
import { blogPosts } from "../../lib/data";

export default function BlogPage({ title, date, content }) {
  return (
    <div>
      <Head>
        <title>{title} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{title}</h1>
        <div>{content}</div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const data = blogPosts.find((post) => post.slug === params.slug);
  return {
    props: data, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths, // See the "paths" section below

    fallback: false,
  };
}
