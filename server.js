const express = require("express");
const path = require("path");
const dataRoutes = require("./routes/data.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/data", dataRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server Express 5 berjalan di http://localhost:${PORT}`);
});