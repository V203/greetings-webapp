const assert = require("assert");
const ServicesFactory = require("../servicesFactory");

const pg = require("pg");
// const servicesFactory = require("../servicesFactory");
const Pool = pg.Pool;

// let useSSL = false;
// let local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local) {
//     useSSL = true;
// }

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/db_test';

const pool = new Pool({
    connectionString,
});


describe('Greetings SQL queries', function () {
    beforeEach(async function(){
               // clean the tables before each test run
               try {
                   
               await pool.query("delete  from users;")
               } catch (error) {
                   console.error(error)
               }

    });

    

    it("It should greet ron twice and and the counter should not be greater than one", async function () {
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("latin","ron");
        await servicesFactory.addUserOrUpdate("latin","ron");
        let serve = await servicesFactory.all()
        assert.equal(1,serve)
        
    })
    it('It should greet rick once and return the size of the array equal to one', async function () {

        let servicesFactory = await ServicesFactory(pool)
        await servicesFactory.addUserOrUpdate("latin","rick")
        let serve = await servicesFactory.all()
        assert.equal(1, serve)
    })

    it("It sgould greet tyler and return name as an object withe value of his greet counter",async ()=>{
        
        let servicesFactory = await ServicesFactory(pool)
        await servicesFactory.addUserOrUpdate("venda","tyler")
        let theObsj = await servicesFactory.objectifyNamesAndGreets()
        let expectedOut = { Tyler: 1}
        assert.deepEqual(expectedOut,theObsj)
    })
    it("Should greet steve ,duke and james and return their names as an array",async ()=>{
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("venda","steve")
        await servicesFactory.addUserOrUpdate("venda","duke")
        await servicesFactory.addUserOrUpdate("venda","james")        
        assert.deepEqual(['Steve','Duke','James'],await servicesFactory.themNames())
    })

    it("Should greet steve ,duke and james and return their values of how many times they were greeted as an array numbers",async ()=>{
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("latin","steve")
        await servicesFactory.addUserOrUpdate("latin","duke")
        await servicesFactory.addUserOrUpdate("latin","james")
        await servicesFactory.addUserOrUpdate("latin","steve")
        await servicesFactory.addUserOrUpdate("venda","duke")        
        assert.deepEqual([1,2,2],await servicesFactory.themGreets())


    })

    it("the counter should not increase if a button is not checked",async ()=>{
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("","Vuyisa")

        assert.equal(0,await servicesFactory.all())
    })
    


    // it('Should equal ')

    after(function () {
        pool.end();
    })
});
