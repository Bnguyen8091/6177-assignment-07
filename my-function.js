// my-function.js — AWS Lambda (Node.js 20.x)
exports.handler = async (event) => {

  // Get keyword from query string
  let keyword = event?.queryStringParameters?.keyword;

  // Fallback: parse raw query string
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

