import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const takesDir = path.join(process.cwd(), "content/takes");

export type Take = {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
};

type TakeWithRawDate = Take & { rawDate: Date };

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

const processor = remark().use(html, { sanitize: true });

export async function getTakes(): Promise<Take[]> {
  if (!fs.existsSync(takesDir)) return [];

  const files = fs.readdirSync(takesDir).filter((f) => f.endsWith(".md"));

  const takes: TakeWithRawDate[] = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(takesDir, filename), "utf8");
      const { data, content } = matter(raw);

      if (!data.title || !data.date) {
        throw new Error(`takes/${filename} is missing required frontmatter (title, date)`);
      }

      const processed = await processor.process(content);
      return {
        slug,
        title: data.title as string,
        date: formatDate(data.date as Date),
        rawDate: data.date as Date,
        contentHtml: processed.toString(),
      };
    })
  );

  const sorted = takes.sort(
    (a, b) => b.rawDate.getTime() - a.rawDate.getTime()
  );

  return sorted.map(({ rawDate: _rawDate, ...take }) => take);
}
