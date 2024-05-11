import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "./Config";
import router from "./app/routes";
import GlobalErrorHandler from "./Error/globalErrorHandler";
import BootstrapApp from "./server";

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

BootstrapApp();

app.get("/", (req, res) => {
  res.send(
    `<h1 style='text-align: center; padding: 20px; color:green'>${config.app_name} Server is Running 🌱!</h1>`
  );
});

app.use("/api/v1", router);
//global error handler
app.use(GlobalErrorHandler);

app.listen(config.port, () => {
  console.info(`Server running 🚀 on port ${config.port}`);
});
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: `🚦 Requested ${req.originalUrl} this Route Not Found 💥`,
      },
    ],
  });
  next();
});

export default app;