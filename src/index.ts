import config from "./Config";
import app from "./server";
import { Server } from "http";

const BootstrapApp = async () => {
    
  const server: Server = app.listen(config.port, () => {
    console.info(`Server running 🚀 on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.warn("Server closed");
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.warn(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    console.info("SIGTERM received");
    if (server) {
      server.close();
    }
  });
}

BootstrapApp();