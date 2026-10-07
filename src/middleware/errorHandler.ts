import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
    res.status(409).json({ success: false, message: "A record with this value already exists" });
    return;
  }

  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message = error instanceof AppError ? error.message : "Internal server error";
  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({ success: false, message });
};
