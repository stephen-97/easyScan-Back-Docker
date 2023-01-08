export {}


module.exports = {
    jwtRemoveBearerFromString : (jwt: string) => {
        return jwt.replace("Bearer ","");
    }
}