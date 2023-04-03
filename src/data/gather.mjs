import fs from 'fs';

(async () => {
    for(let i = 1; i <= 2000; i++) { // 2000 is a rough max of CPIDs
        try {
            console.log("Trying " + i + "...");
            const response = await fetch('http://usaco.org/index.php?page=viewproblem2&cpid=' + i);
            const body = await response.text();
            const title = body.match(/<h2>(.*?)<\/h2>/)[1];
            const difficulty = title.match(/Bronze|Silver|Gold|Platinum/)[0];
            const year = title.match(/20\d\d/)[0];
            if(year > 2015) {
                if (difficulty === 'Bronze') {
                    console.log('Found problem ' + i + ' with difficulty Bronze and year ' + year + '.');
                    const bronze = JSON.parse(fs.readFileSync('bronze.json', 'utf8'));
                    if (!bronze.includes(i)) {
                        bronze.push(i);
                        fs.writeFileSync('bronze.json', JSON.stringify(bronze));
                    }
                } else if (difficulty === 'Silver') {
                    console.log('Found problem ' + i + ' with difficulty Silver and year ' + year + '.');
                    const silver = JSON.parse(fs.readFileSync('silver.json', 'utf8'));
                    if (!silver.includes(i)) {
                        silver.push(i);
                        fs.writeFileSync('silver.json', JSON.stringify(silver));
                    }
                } else if (difficulty === 'Gold') {
                    console.log('Found problem ' + i + ' with difficulty Gold and year ' + year + '.');
                    const gold = JSON.parse(fs.readFileSync('gold.json', 'utf8'));
                    if (!gold.includes(i)) {
                        gold.push(i);
                        fs.writeFileSync('gold.json', JSON.stringify(gold));
                    }

                } else if (difficulty === 'Platinum') {
                    console.log('Found problem ' + i + ' with difficulty Platinum and year ' + year + '.');
                    const platinum = JSON.parse(fs.readFileSync('platinum.json', 'utf8'));
                    if (!platinum.includes(i)) {
                        platinum.push(i);
                        fs.writeFileSync('platinum.json', JSON.stringify(platinum));
                    }

                }
            }
            else {
                console.log('ID ' + i + ' is too old (' + year + ').')
            }
        }
        catch(e) {
            console.log("ID " + i + " doesn't exist.");
        }
    }
    console.log("Done!");
})();
