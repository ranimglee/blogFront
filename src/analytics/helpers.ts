// analytics/helpers.ts
export function extractPageInfo(path: string) {
  if (path.startsWith("/article/")) {
    return { category: "ARTICLE", pageId: path.split("/")[2] };
  }

  if (path.startsWith("/projects/")) {
    return { category: "PROJECT", pageId: path.split("/")[2] };
  }

  return { category: "PAGE", pageId: null };
}