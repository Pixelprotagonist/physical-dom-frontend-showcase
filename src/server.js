import express from "express";
import ViteExpress from "vite-express";
import cors from 'cors';
import dotenv from 'dotenv';

import { producePdf } from "./helpers/serverHelpers.js";

const app = express();
app.use(cors())
dotenv.config({path:".env"});


app.get("/api/print", async (req, res) => {
  const pdfUrl = await producePdf(process.env.API_TOKEN, req.query.token)
  res.send(pdfUrl);
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));