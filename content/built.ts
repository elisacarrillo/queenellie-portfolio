import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const builtDir = path.join(process.cwd(), "content/built");

export type Built = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  link: string;
  screenshot?: string;
  featured: boolean;
  contentHtml: string;
};

const processor = remark().use(html, { sanitize: true });

export async function getBuilt(): Promise<Built[]> {
  if (!fs.existsSync(builtDir)) return [];

  const files = fs.readdirSync(builtDir).filter((f) => f.endsWith(".md"));

  const items: Built[] = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(builtDir, filename), "utf8");
      const { data, content } = matter(raw);

      if (!data.title || !data.category || !data.link) {
        throw new Error(
          `built/${filename} is missing required frontmatter (title, category, link)`
        );
      }

      const processed = await processor.process(content);

      return {
        slug,
        title: data.title as string,
        category: data.category as string,
        tags: (data.tags as string[]) ?? [],
        link: data.link as string,
        screenshot: data.screenshot as string | undefined,
        featured: (data.featured as boolean) ?? false,
        contentHtml: processed.toString(),
      };
    })
  );

  // Featured item first, then preserve filesystem order
  return items.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}
