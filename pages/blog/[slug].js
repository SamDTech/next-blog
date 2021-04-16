import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
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
        <div className='border-b-2 border-gray-200 mb-4'>
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="text-gray-500 text-md">
            {format(parseISO(date), "MMMM do, uuu")}
          </div>
        </div>

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
