module.exports = function GreetFactory(pool) {

    var namesGreeted = {}


    var greetMachine = {
        "greetCounter": getGreetCtr()

    }




   

  

 

    function action(checked, grtName_) {

        if ((checked !== undefined && grtName_ !== undefined) && ((checked !== "" && grtName_ !== ""))) {
            setNames(grtName_)
            let grtName = grtName_.charAt(0).toUpperCase() + grtName_.slice(1).toLowerCase();

            if (checked === "japanese") {
                return "Konnichiwa, " + grtName;
            }
            else if (checked === "venda") {
                return "Ndaa, " + grtName
            }
            else if (checked === "latin") {
                return "Salve, " + grtName
            }
        }
    }

    function setNames(name) {
        let name_ = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        if (name_ === "" || name_ === undefined) { return undefined }
        if (namesGreeted[name_] === undefined) {
            namesGreeted[name_] = 1;

        }
        else {
            namesGreeted[name_] += 1
        }

    }

    function antiEmpty(par) {
        if (par === "") {
            return "Please enter your name in text field eg.'Sam', then click the greet button to be greeted."
        }


    }

    function antiDigit(par) {
        var para = /[0-9]/;
        if (par.match(para)) {
            return par;
        }


    }
    function testChecked(par) {
        return (par === null) ? "Please select a language by checking one of the radio buttons below eg 'latin'." : undefined;

    }

    function getGreetCtr() {

        return Number(Object.keys(namesGreeted).length) || 0
    }

    function deGreeted() {

        return namesGreeted = {}
    }

    function greeted() {

        return namesGreeted
    }

    function getUserCounter(name_) {
        // let element;
        // let name_ = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        for (const key in namesGreeted) {

            if (name_ === key) {

                return  name_

            }
            // console.log(namesGreeted[key]);
            // element = namesGreeted[key]; 
            // console.log(element+" element");               
        }

    }

    function getSpecificKey(name_,para) {
        // let name_ = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        for (const key in para) {

            if (name_ === key) {

                return para[key]

            }
        
        }

    }
    function getSpecificvalue(name_,para) {
        // let name_ = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        for (const key in para) {

            if (name_ === key) {

                return key

            }

        }

    }


    function getGreetKeys() {
        return Object.keys(namesGreeted)
    }
    function showAllGreets() {
        return (getGreetCtr() > 0) ? "You have greeted -->: " + Object.keys(namesGreeted) : "Type A name in the text field and click the show all button to display all the names you have greeted.";
    }

    function clearError(par) {
        return ""
    }
    // console.log(Object.values(namesGreeted))


    function universalFunction(para) {
        para[counter] = 0
        if (para) {
            para.couter++


        }

    }

    function allGreets() {
        return namesGreeted;
    }

    function testError(par1, par2) {
        if (par1 === undefined || par1 === "") {


            return "Please click one of the radio buttons and press enter to be greeted."

        } else if (par2 === undefined || par2 === "") {
            return "Please enter you name in the text field and click the greet me button."

        } else if ((par2 === undefined || par2 === "") && (par1 === undefined || par1 === "")) {
            return "Please select seelct a radio button and enter you name in the text field."
        }
    }

    // async function all() {
    //     let users = await pool.query('select * from users');
    //     return users.rows;

    // }
    // async function insertion() {
    //     await pool.query("insert into users (names, greet_counter) values($1, $2 )", ['rick', 8])

    // }

    // async function add(name_, counter_) {
    //     let data = await pool.query(`
    //     if select * from users where names = $1 and greet_counter = $2
    //     begin
    //         update users set greet_counter =  $2++ 
    //     end
        
    //     else 
    //     begin
    //     insert into users (names, greet_counter) values($1, $2)
    //     end
    //     `, [name_, counter_])
    //     return data
    // }
    // async function add2() {
    //    name_= 'vuyisa'
    //    counter_ = 23
    //     await pool.query('insert into users (names+, +greet_counter) values('+name_, counter_+')')
    // }

    return {
        setNames,
        action,
        getGreetCtr,
        greeted,
        antiEmpty,
        antiDigit,
        showAllGreets,
        getGreetKeys,
        testChecked,
        clearError,
        getUserCounter,
        universalFunction,
        getSpecificKey,
        getSpecificvalue,
        testError,
        allGreets,
        deGreeted,
        setname,
        existingname,
        all,
        insertion,
        add
    }
}