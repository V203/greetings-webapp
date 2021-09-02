
const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const flash = require('express-flash');
const session = require('express-session');
const GreetFactory = require("./greet-factory-function")
const ServicesFactory = require("./servicesFactory")

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


// initialise the flash middleware
app.use(flash());

const greetFactory = GreetFactory(pool);



app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: "./views/partials", viewPath: './views', layoutsDir: './views/layouts' }));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("public"));





const PORT = process.env.PORT || 3011;




// var counter = async()=>{
//      return counter__ = await servicesFactory.all()
// }


    
    var output =[];
    // for (var key in theFolks) {
    //           console.log( theFolks[key])
    //     //  output.push( Object.values(theFolks[key]));
        
    //     return output;
    // }
app.get("/", async(req, res) => {
    
    await servicesFactory.all()
   
    res.render("index", {
       counterDiv:await servicesFactory.all(),out_div: greetFactory.action(req.body.rdio, req.body.enter_name)
    })
})

app.post("/greet", async (req, res) => {
    
    var rdio = req.body.rdio;
    var enter_name = req.body.enter_name;
       
     req.flash("error",greetFactory.testError(rdio, enter_name))
     await servicesFactory.setNames(enter_name);
    
    
    await servicesFactory.addUserOrUpdate(rdio, enter_name)
    res.render("index", {
        out_div: await greetFactory.action(req.body.rdio,enter_name),
        counterDiv:await servicesFactory.all()
    })    
   
})

app.post("/reset",async  (req,res) => {
        
        await pool.query("drop table users");
        await pool.query("create table users(id serial primary key,names text not null ,greet_counter int not null)")
        res.redirect("/");
    }
)

app.post("/greeted",async (req, res) => {
    var theFolks = async()=>{ return theFolks__ = await servicesFactory.themNames()}
    
    res.render("greeted", {
        output:await theFolks()
    })
})

app.get("/counter/:userGreeted", async(req, res) => {
    
    var userIn = req.params.userGreeted;
    var ourKeys =  greetFactory.getSpecificKey(userIn,  await servicesFactory.objectifyNamesAndGreets())
    var theValues = greetFactory.getSpecificvalue(userIn, await servicesFactory.objectifyNamesAndGreets())
    res.render("UsersCounter", { ourKeys, theValues });
    
})

app.post("/action", (req, res) => {
    res.render("index", { out_div: greetFactory.action(req.body.rdio, req.body.enter_name) })
    // res.redirect("/");
})

app.post("/greet",function(req,res){

    res.render("index", {
        out_div: greetFactory.action(req.body.rdio,enter_name)}
        )
    res.render("/")
})

// console.log(theFolks+" the names")rs
app.listen(PORT, () => {
    console.log("Listening at PORT: " + PORT);
    
})
// 