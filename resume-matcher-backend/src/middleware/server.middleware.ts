import express, { Application } from "express";

async function initalizeMiddleware(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

export default initalizeMiddleware;
