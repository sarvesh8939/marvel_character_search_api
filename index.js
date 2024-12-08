import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import md5 from "js-md5";

const app = express();
const port = 3000;

let timestamp = Date.now();
let apikey = "b421cb4cc43f0c875b892b40465a5e31";
let privateckey = "d60f5dd98900a7abd6b5f1ecf93ed75ca189105e";
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
  const response = await axios.get(
    `${url}v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hash}&nameStartsWith=${name}`
  );
  const result = response.data;
  console.log(name);

    // result.data.results.forEach((element) => {

    // charid = element.id;
    // charactername = element.name;
    // imgpath = element.thumbnail.path;
    // extension = element.thumbnail.extension;
    // console.log(charid,charactername,imgpath,extension);
  //  json = result.data.results;
  //    var div = document.createElement("div");
  //    div.setAttribute("class", "item");
  //    div.innerHTML = `<img src="${imgpath}.${extension}" alt="${charid}">
  //                    <center><h5>${charactername}</h5></center>`;
  //    content.append(div);
    // });
    console.log(result.data.results);
   res.render("index.ejs", { data: result.data.results });
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
