export function extractPageInfo(path: string) {

  // DO NOT TRACK DETAIL PAGES HERE
  // They are tracked manually with real Mongo IDs

  if (path.startsWith("/article/")) {
    return null;
  }

  if (path.startsWith("/projects/")) {
    return null;
  }

  return {
    category: "PAGE",
    pageId: null,
  };
}