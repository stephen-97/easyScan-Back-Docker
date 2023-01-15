import {Request, Response} from "express";

module.exports = {
    convertDatetimeToFormat : (date: string) => {
        return new Date(date).toLocaleDateString('en-GB', );
    }
}
export {}


