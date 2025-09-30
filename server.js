import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// Set Lambda Function URL 
const FUNCTION_URL = "https://rqwyra6d22cg3hjnocjxtwmro40cufar.lambda-url.us-east-2.on.aws/";

app.get("/say", async (req, res) => {
  try {
    const { keyword } = req.query;
    const r = await axios.get(FUNCTION_URL, { params: { keyword } });
    res.type("text/plain").send(r.data);
  } catch (e) {
    console.error(e?.response?.data || e.message);
    res.status(500).send("Error calling function");
  }
});

app.listen(PORT, () => {
  console.log(`Web service running on http://0.0.0.0:${PORT}`);
});
