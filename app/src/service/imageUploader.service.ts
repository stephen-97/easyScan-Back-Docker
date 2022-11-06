export {}
const User = require("../models/user.model");
const { dirname } = require('path');
const { constants, promises: { access } } = require('fs');
const fs = require('fs')
import * as path from 'path'


module.exports = {
    imageType:  (data: string): any => {
        switch (data.charAt(0)){
            case '/': return 'png'
            case 'i': return 'jpg'
            default: return null
        }
    },
    avatarUploader:  (base64data: string, username: string, ): any => {
        const projectPath = dirname(require.main.filename);
        const avatarType = module.exports.imageType(base64data.replace(/^data:image\/\w+;base64,/, ""))
        if(!avatarType) throw Error("Erreur, fichier non conforme")
        const avatarFileName = `${username}_${Math.floor(Math.random()*1E16)}.${avatarType}`

        fs.writeFileSync(
            `${projectPath}/src/public/avatars/${avatarFileName}`,
            Buffer.from(base64data.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
            (err) => { throw Error(err)}
        )
        return avatarFileName;
    },
    avatarDeleteFile:  (avatarFileName: string): void => {
        const projectPath = dirname(require.main.filename);
        fs.unlink(`${projectPath}/src/public/avatars/${avatarFileName}`, (err) => {if(err) throw Error(err)})
    },
}


