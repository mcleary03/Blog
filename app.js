var bodyParser = require("body-parser")
var mongoose   = require("mongoose")
var express    = require("express")
var app        = express()

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app")
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))


// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: { type: Date, default: Date.now }
})
var Blog = mongoose.model("Blog", blogSchema)


//RESTFUL ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs")
})

// INDEX
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log("ERROR!!")
        } else {
            res.render("index", { blogs })
        }
    })
})

//NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new")
})

//CREATE ROUTE
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, blog) => {
        if (err) {
            res.render("new")
        } else {
            res.redirect("/blogs")
        }
    })
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("SERVER IS RUNNING!")
})