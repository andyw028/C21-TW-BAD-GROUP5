import express from 'express';
import expressSession from "express-session";
import path from "path";

const app = express();

app.use(
    expressSession({
      secret: "FBqvkCC09f",
      resave: true,
      saveUninitialized: true,
    })
  );


app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
  });

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);

})

