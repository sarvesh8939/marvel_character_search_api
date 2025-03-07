import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import md5 from "js-md5";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

let timestamp = Date.now();
let apikey = process.env.APIKEY;
let privateckey = process.env.PRIVATEKEY;
let hash = md5(timestamp + privateckey + apikey);
let url = "http://gateway.marvel.com/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  let msg = "enter the character name in the search box";
  res.render("index.ejs");
});

var charid, charactername, imgpath, extension, json;
app.post("/search", async (req, res) => {
  var name = req.body["searchbar"];
  try {
    const response = await axios.get(
    `${url}v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hash}&nameStartsWith=${name}`
  );
  const result = response.data;
  // console.log(name);
  //   console.log(result.data.results);
   res.render("index.ejs", { data: result.data.results });
  } catch (error) {
     const status = res.statusCode;
     if (status >= 400 && status <= 499){
      res.render("index.ejs",{msg:"NO CHARACTER IN THIS NAME"});
     }
     else{
      res.render("index.ejs",{msg:"SERVER PROBLEM"});
     }
     console.log(status);
  }
  

});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
