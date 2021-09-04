const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const flash = require('express-flash');
const session = require('express-session');
const ServicesFactory = require("./servicesFactory");

const app = express();
const pg = require("pg");

const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = false;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/db';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

var servicesFactory = ServicesFactory(pool)
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: "./views/partials", viewPath: './views', layoutsDir: './views/layouts' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3011;

app.get("/", async (req, res) => {
    await servicesFactory.all()
    res.render("index", {
        counterDiv: await servicesFactory.all()
    })
})

app.post("/greet", async (req, res) => {
    req.flash("error",await servicesFactory.testError(req.body.rdio, req.body.enter_name))
    res.render("index", {
        out_div: await servicesFactory.addUserOrUpdate(req.body.rdio, req.body.enter_name),
        counterDiv: await servicesFactory.all()
    }) 
})

app.post("/reset", async (req, res) => {
    await servicesFactory.sqlReset();
    res.redirect("/");
}
)

app.post("/greeted", async (req, res) => {
    res.render("greeted", {
        output: await servicesFactory.themNames()
    })
})

app.get("/counter/:userGreeted", async (req, res) => {
    let themUsers = await servicesFactory.getCurrentName(req.params.userGreeted)
    res.render("UsersCounter", { names: themUsers['names'], greet: themUsers['greet_counter'] });

})

app.post("/action", (req, res) => {
    res.render("index", { out_div})
    // res.redirect("/");
})
app.listen(PORT, () => {
    console.log("Listening at PORT: " + PORT);

})
