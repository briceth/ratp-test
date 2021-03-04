import app from "./app";

const PORT = 4000;

const server = app().listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

function exitHandler(code: number, message: string) {
  return (error?: Error) => {
    console.info(message);

    if (error && error instanceof Error) {
      console.error(error);
    }

    server.close((error) => {
      if (error) {
        console.error(error);
        return process.exit(1);
      }

      console.info("server is closed");
      return process.exit(code);
    });
  };
}

// Manage Ctrl+C signal
process.on("SIGINT", exitHandler(0, "SIGINT signal received"));

// Manage terminate process signal (ex: kill)
process.on("SIGTERM", exitHandler(0, "SIGTERM signal received"));

// Manage uncaught exception
process.on(
  "uncaughtException",
  exitHandler(1, "uncaughtException signal received")
);

// Manage unhandled promise rejection
process.on(
  "unhandledRejection",
  exitHandler(1, "unhandledRejection signal received")
);
