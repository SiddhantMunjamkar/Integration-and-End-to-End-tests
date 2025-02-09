import express from "express";
import { prismaClient } from "./db";

export const app = express();

app.use(express.json());

// @ts-ignore
app.post("/sum", async (req, res) => {
  const a = req.body.a;
  const b = req.body.b;

  if (a > 10000 || b > 10000) {
    return res.status(422).json({
      message: "Sorry we dont support big number",
    });
  }

  const result = a + b;

  const request = await prismaClient.request.create({
    data: {
      a: a,
      b: b,
      answer: result,
      type: "ADD",
    },
  });

  res.json({
    result: result,
    id: request.id,
  });
});

// @ts-ignore
app.get("/request", async (req, res) => {
  const id =Number(req.query.id);
  const request = await prismaClient.request.findFirstOrThrow({
    where: {
      id: Number(id),
    },
  });

  res.json({
    id: request.id,
    a: request.a,
  });
});
