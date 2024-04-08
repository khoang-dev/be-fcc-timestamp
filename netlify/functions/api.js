import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

app.use('/.netlify/functions/api', router);

export const handler = serverless(api);
