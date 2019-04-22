const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const fs = require("fs"); 
var isWindows = process.platform === "win32";
var path = isWindows ? `${process.env.appdata}\\goto-cli-bookmarker\\bookmarkdata.json` : "~\\goto-cli-bookmarker\\bookmarkdata.json"
if (!fs.existsSync(path)) { fs.mkdirSync(path) }
const adapter = new FileSync('db.json');
const database = low(adapter);
database.defaults({ bookmarks: [] }).write();

const add = (bookmark) => {
    if (!get(bookmark.name)) {
        database
            .get('bookmarks')
            .push(bookmark)
            .write();
    }
};

const list = (group) => {
    if (group) {
        return (
            database
                .get('bookmarks')
                .filter({group: group})
                .value()
        );
    } else {
        return (
            database
                .get('bookmarks')
                .value()
        );
    }
};

const remove = (name) => {
    database
        .get('bookmarks')
        .remove({ name: name })
        .write();
};

const get = (name) => {
    return (
        database
            .get('bookmarks')
            .filter({ name: name })
            .value()[0]
    )
}

module.exports = { add, list, remove, get };
