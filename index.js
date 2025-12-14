import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var blogs = [];
var selectedBlog = null;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs", { blogs });
});

app.get("/blog/:id", (req, res) => {
  console.log('req', req);
    selectedBlog = blogs.find(blog => blog.id === req.params.id);
    res.render("submit-blog.ejs", { selectedBlog });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/submit-blog", (req, res) => {
    res.render("submit-blog.ejs");
});

app.post("/submit-blog", (req, res) => {
    console.log(req.body);
    let blogToPost = req.body;
    blogs.push(blogToPost);
    res.redirect("/");
});

app.put("/edit-blog", (req, res) => {
    console.log(req.body);
    let blogIdToEdit = req.body.id;
    blogs = blogs.map(blog => blog.id === blogIdToEdit ? req.body : blog);
    res.redirect("/");
});

