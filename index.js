const store = require('./lib/bookmark-store');
const opn = require('opn');
var program = require('commander');
 
program
    .command('goto <identifier>')
    .action((identifier) => {
        // check if any groups
        var bookmarks = store.list(identifier);
        if (bookmarks.length > 0) {
            bookmarks.forEach(bookmark => {
                opn(bookmark.url).catch(err => { console.error(err) });
            });
        } else {
            var bookmark = store.get(identifier);
            opn(bookmark.url).catch(err => { console.error(err) });
        }
    })

program
    .command('list')
    .action(() => {
        var bookmarks = store.list();
        console.log(`CATEGORY | NAME | URL`);
        bookmarks.forEach(bookmark => {
            console.log(`${bookmark.group} | ${bookmark.name} | ${bookmark.url}`);
        })
    })

program.parse(process.argv);
 

