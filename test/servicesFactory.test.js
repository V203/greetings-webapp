const assert = require("assert");
const ServicesFactory = require("../servicesFactory");
const pg = require("pg");
const Pool = pg.Pool;
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
    it("It should greet ron twice and and the counter should not be greater than one.", async function () {
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("latin","ron");
        await servicesFactory.addUserOrUpdate("latin","ron");
        let serve = await servicesFactory.all();
        assert.equal(1,serve);
        
    })
    it('It should greet rick once and return the size of the array equal to one.', async function () {
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("latin","rick");
        let serve = await servicesFactory.all();
        assert.equal(1, serve);
    })

    it("Should greet Steve ,Duke then james and return their names as an array.",async ()=>{
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("venda","steve")
        await servicesFactory.addUserOrUpdate("venda","duke")
        await servicesFactory.addUserOrUpdate("venda","james")        
        assert.deepEqual(['Steve','Duke','James'],await servicesFactory.themNames())
    })

    it("Should greet Jameso and James  then return Jameso name from table.",async ()=>{
        let servicesFactory = await ServicesFactory(pool);
        await pool.query("insert into users(names,greet_counter) values('Jameso',1)");
        await pool.query("insert into users(names,greet_counter) values('James',1)");
        let actual = await servicesFactory.getCurrentName('Jameso');
        assert.equal('Jameso', actual.names);
    })

    it("Should greet Steve, Duke, James and return their values of how many times they were greeted as an array of integers.",async ()=>{
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("latin","steve");
        await servicesFactory.addUserOrUpdate("latin","duke");
        await servicesFactory.addUserOrUpdate("latin","james");
        await servicesFactory.addUserOrUpdate("latin","steve");
        await servicesFactory.addUserOrUpdate("venda","duke");      
        assert.deepEqual([1,2,2],await servicesFactory.themGreets());
    })
    it("Should insert names into the table then clear all columns and test if the counter is equal to zero.",async ()=>{
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("latin","james");
        await servicesFactory.addUserOrUpdate("latin","steve");
        await servicesFactory.addUserOrUpdate("venda","duke");
        await servicesFactory.sqlReset();
        assert.equal(0,await servicesFactory.all())

    })
    it("The counter should not increase if a button is not checked.",async ()=>{
        let servicesFactory = await ServicesFactory(pool);
        await servicesFactory.addUserOrUpdate("","Vuyisa");
        assert.equal(0,await servicesFactory.all());
    })
    it("Should greet Tsepho in venda and return --> 'Ndaa, Tsepho'.",async()=>{
        let servicesFactory = await ServicesFactory(pool)
        assert.equal("Ndaa, Tsepho",await servicesFactory.addUserOrUpdate("venda","Tsepho"))
    })
    it("Should greet Mat in latin and return --> 'Salve, Mat'.",async()=>{
        let servicesFactory = await ServicesFactory(pool)
        assert.equal("Salve, Mat",await servicesFactory.addUserOrUpdate("latin","Mat"))
    })
    it("Should greet Kim in japanese and return --> 'Konnichiwa, Kim'.",async()=>{
        let servicesFactory = await ServicesFactory(pool);
        assert.equal("Konnichiwa, Kim",await servicesFactory.addUserOrUpdate("japanese","Kim"))
    })
    it("Should inform the user that they greeted with out clicking a radio button.",async ()=>{
        let servicesFactory =await ServicesFactory(pool)
        let expected = "Please click one of the radio buttons and press enter to be greeted."
        assert.equal(expected,servicesFactory.testError("",""))

    })
    


    after(function () {
        pool.end();
    })
});
