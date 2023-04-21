import fs from 'fs';

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

(async () => {
    for (let i = 1; i <= 2000; i++) { // 2000 is a rough max of CPIDs
        try {
            console.log("Trying " + i + "...");
            const response = await fetch('http://usaco.org/index.php?page=viewproblem2&cpid=' + i);
            const body = await response.text();
            const title = body.match(/<h2>(.*?)<\/h2>/)[1];
            const difficulty = title.match(/Bronze|Silver|Gold|Platinum/)[0].toLowerCase();
            const year = title.match(/20\d\d/)[0];
            if (year > 2015) {
                console.log('ID ' + i + ' is in ' + year + ' and is ' + difficulty + '.');
                if (data[difficulty].indexOf(i) === -1) {
                    data[difficulty].push(i);
                    console.log('Added to ' + difficulty + '.');
                }
                fs.writeFileSync('data.json', JSON.stringify(data, null, 4));

            } else {
                console.log('ID ' + i + ' is too old (' + year + ').')
            }
        } catch (e) {
            console.log("ID " + i + " doesn't exist.");
        }
    }
    console.log("Done!");
})();
