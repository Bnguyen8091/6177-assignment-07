import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// Set Lambda Function URL 
const FUNCTION_URL = process.env.FUNCTION_URL;

app.get("/say", async (req, res) => {
  try {
    if (!FUNCTION_URL) {
      return res.status(500).send("FUNCTION_URL not configured on the server");
    }
    const { keyword } = req.query;

    // Forward the call to Lambda Function URL
    const response = await axios.get(FUNCTION_URL, {
      params: { keyword },
      timeout: 5000,
    });

    // Return Lambda’s response directly
    res.type("text/plain").send(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).send("Error calling function");
  }
});

app.listen(PORT, () => {
  console.log(`Web service running on http://0.0.0.0:${PORT}`);
});
