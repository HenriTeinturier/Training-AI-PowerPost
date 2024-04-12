import { load } from "cheerio";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";

const nhm = new NodeHtmlMarkdown(
  /* options (optional) */ {},
  /* customTransformers (optional) */ undefined,
  /* customCodeBlockTranslators (optional) */ undefined
);

export const scrapPost = async (source: string) => {
  const content = await fetch(source).then((res) => res.text());
  const $ = load(content);

  const articleHtml =
    $("article").html() ||
    $(".prose").html() ||
    $(".content").html() ||
    $("#content").html() ||
    $(".article").html() ||
    $(".post").html() ||
    $("main").html() ||
    $("body").html();

  if (!articleHtml) {
    throw new Error("No article content found");
  }

  const $head = $("head");

  const url =
    $head.children("meta[property='og:image']").attr("content") ||
    $head.children("meta[name='og:image']").attr("content") ||
    $head.children("meta[name='twitter:image']").attr("content") ||
    $head.children("meta[name='twitter:image:src']").attr("content");

  const postMarkdown = nhm.translate(articleHtml);

  return { markdown: postMarkdown, coverUrl: url };
};
