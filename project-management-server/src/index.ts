import "reflect-metadata";
import express from "express";
import router from "./routes";  
import { AppDataSource } from "./data-source";  

const app = express();


app.use(express.json());


app.use("/api", router);


AppDataSource.initialize()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("Database connection error: ", error);
    process.exit(1);  // Exit if the database connection fails
  });

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled error:", err.stack || err);
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : {},
    });
});

