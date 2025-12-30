// app.js
const express = require("express");
const app = express();

// Root route
app.get("/", (req, res) => {
  res.send("Hello from CI/CD Pipeline 🚀");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
