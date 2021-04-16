import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import Head from "next/head";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import { getAllPosts } from "../../lib/data";

export default function BlogPage({ title, date, content }) {
  const hydratedContent = hydrate(content );
  return (
    <div>
      <Head>
        <title>{title} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="border-b-2 border-gray-200 mb-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="text-gray-500 text-md">
            {format(parseISO(date), "MMMM do, uuu")}
          </div>
        </div>

        <div className="prose">{hydratedContent}</div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const allPost = getAllPosts();
  const { params } = context;

  const { data, content } = allPost.find((post) => post.slug === params.slug);
  const mdxSource = await renderToString(content);
  return {
    props: {
      ...data,
      date: data.date.toISOString(),
      content: mdxSource,
    },
  };
}

export async function getStaticPaths() {
  const allPost = getAllPosts();
  const paths = allPost.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths, // See the "paths" section below

    fallback: false,
  };
}
