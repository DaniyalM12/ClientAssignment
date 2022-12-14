import express from "express";
import { fetchSKU } from "./controllers";

const host = "localhost";
const port =  Number(process.env.PORT || 1337);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  console.info(`Server Listening at http://${host}:${port}`);
  app.get("/skus", fetchSKU);
});
