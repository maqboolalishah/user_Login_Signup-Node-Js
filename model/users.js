const db = require('./../config/database')

class Users{
    constructor(){
        this.table = 'users';
        this.db=db;
        
    };

    check_login(email) {

        const query = `SELECT *
                       FROM ${this.table}
                       WHERE
                       email='${email}'
                      `;
        //    console.log(query);
        return db.execute(query);
    }
    userSignup(name,email,password){
        return db.execute(`INSERT INTO ${this.table} SET userName="${name}",  userEmail="${email}", password="${password}"`);
    };
    

};

module.exports=Users;