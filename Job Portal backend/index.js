import express from "express"
import userRoutes from "./User/user.route.js"
import { db_connect } from "./db_connect.js"
import jobRoutes from "./Job/job.route.js"

const app = express()

app.use(express.json())

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );

   if (req.method === "OPTIONS") {
      res.header("Access-Control-Expose-Headers", "accessToken, refreshToken,");
      res.header(
         "Access-Control-Allow-Methods",
         "PUT, POST, PATCH, DELETE, GET, OPTIONS"
      );
      return res.status(200).json({});
   }

   return next();
});

// db_connect
db_connect()

// register routes
app.use(userRoutes)

app.use(jobRoutes)

const port = process.env.API_PORT

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})