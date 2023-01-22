export {}
const bcrypt = require("bcrypt");


module.exports = {
    hashPassword: async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        return await new Promise((res, rej) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) rej(err);
                res(hash)
            })
        })
    },
    comparePassword: async (password: string, databasePassword: string) => {
        return await new Promise((res, rej) => {
            bcrypt.compare(password, databasePassword, (err, result) => {
                if(err) rej(err);
                res(result);
            });
        })
    },
}



