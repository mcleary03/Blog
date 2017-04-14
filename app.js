var methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    express        = require("express"),
    app            = express()

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app")
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
// method-override takes an argument of what to look for to override
app.use(methodOverride("_method"))


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

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new")
})

// CREATE ROUTE
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, blog) => {
        if (err) {
            res.render("new")
        } else {
            res.redirect("/blogs")
        }
    })
})

// SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.render("show", { blog })
        }
    })
})

// EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.render("edit", { blog })
        }
    })
})

// UPDATE ROUTE
app.put("/blogs/:id", (req, res) => {
    //   findByIdAndUpdate(id, newData, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs/" + req.params.id)
        }
    })
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("SERVER IS RUNNING!")
})