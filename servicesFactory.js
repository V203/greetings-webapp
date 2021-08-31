
module.exports = function ServicesFactory(pool) {

    var objectifyNamesAndGreets_ = {}






    async function all() {
        try {
            let all_ = await pool.query('select * from users');
            return all_.rows.length;
        }
        catch (error) {
            console.error(error)
        }

    }

    async function themNames() {
        try {
            let themNames__ = await pool.query("select names from users")
            let themNames_ = themNames__.rows
            let someArr = []
            for (var i in themNames_) {
                someArr.push(Object.values(themNames_[i]))
                someArr = someArr.flat()
            }

            return someArr

        } catch (error) {
            console.error(error)
        }
    }
    async function themGreets() {
        try {
            let themGreets__ = await pool.query("select greet_counter from users");
            let themGreets_ = themGreets__.rows;
            let someArr = [];
            for (var i in themGreets_) {
    
                someArr.push(Object.values(themGreets_[i]));
                someArr = someArr.flat();
            }
            return someArr;
        } catch (error) {
            console.error()
        }

      

    }
    async function objectifyNamesAndGreets() {
        try {
            let names_ = await themNames()
            let counter_ = await themGreets()
            for (let i = 0; i < counter_.length; i++) {
                objectifyNamesAndGreets_[names_[i]] = counter_[i]

            }
            return objectifyNamesAndGreets_
        } catch (error) {
            console.error(error)
        }


    }

    async function addUserOrUpdate(checked, names_, greet_counter_) {
      
        let names = names_.charAt(0).toUpperCase() + names_.slice(1).toLowerCase()
        greet_counter_ = 1
        
            if ((names !== "" && names !== undefined) && (checked !== "" && checked !== undefined)) {
                await pool.query(`
            with upsert as (update users set greet_counter=greet_counter+1 
            where names=$1 returning *)insert into users(names,greet_counter) 
            select $1,$2 where not exists(select * from upsert);
            `, [names, greet_counter_])
            }
        

    }






    function setNames(name) {
        var namesGreeted = {}
        let name_ = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        if (name_ === "" || name_ === undefined) { return undefined }
        if (namesGreeted[name_] === undefined) {
            namesGreeted[name_] = 1;

        }
        else {
            namesGreeted[name_] += 1
        }

    }



    return {
        all,
        addUserOrUpdate,
        setNames,
        themNames,
        themGreets,
        objectifyNamesAndGreets,

    }

}