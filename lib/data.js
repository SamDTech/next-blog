import fs from "fs";
import path from "path";
import matter from "gray-matter";

const currentDirectory = path.join(process.cwd(), "_content");

export const getAllPosts = () => {
  const allPost = fs.readdirSync(currentDirectory);

  return allPost.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const fileContents = fs.readFileSync(
      path.join(currentDirectory, fileName),
      "utf-8"
    );

    const { data, content } = matter(fileContents);

    return {
      data,
      content,
      slug,
    };
  });
};
