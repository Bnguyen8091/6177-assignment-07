//AWS Lambda (Node.js 20.x)
export const handler = async (event) => {
  // works for both direct Lambda URL (queryStringParameters) and raw query (event.rawQueryString)
  const qs = event?.queryStringParameters || {};
  let keyword = qs.keyword;

  if (!keyword && typeof event?.rawQueryString === "string") {
    const params = new URLSearchParams(event.rawQueryString);
    keyword = params.get("keyword");
  }

  const name = "Brian Nguyen";
  const text = `${name} says ${keyword ?? ""}`.trim();

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: text,
  };
};
