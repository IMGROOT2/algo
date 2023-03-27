import fs from 'fs';

(async () => {
    for(let i = 1; i < 2000; i++) { // 2000 is a rough max of CPIDs
        try {
            console.log("trying " + i);
            const response = await fetch('http://usaco.org/index.php?page=viewproblem2&cpid=' + i);
            const body = await response.text();
            const title = body.match(/<h2>(.*?)<\/h2>/)[1];
            const difficulty = title.match(/Bronze|Silver|Gold|Platinum/)[0];

            if(difficulty === 'Bronze') {
                console.log("bronze");
                const bronze = JSON.parse(fs.readFileSync('bronze.json', 'utf8'));
                if(!bronze.includes(i)) {
                    bronze.push(i);
                    fs.writeFileSync('bronze.json', JSON.stringify(bronze));
                }
            }
            else if(difficulty === 'Silver') {
                console.log("silver");
                const silver = JSON.parse(fs.readFileSync('silver.json', 'utf8'));
                if(!silver.includes(i)) {
                    silver.push(i);
                    fs.writeFileSync('silver.json', JSON.stringify(silver));
                }
            }
            else if(difficulty === 'Gold') {
                console.log("gold");
                const gold = JSON.parse(fs.readFileSync('gold.json', 'utf8'));
                if(!gold.includes(i)) {
                    gold.push(i);
                    fs.writeFileSync('gold.json', JSON.stringify(gold));
                }

            }
            else if(difficulty === 'Platinum') {
                console.log("platinum");
                const platinum = JSON.parse(fs.readFileSync('platinum.json', 'utf8'));
                if(!platinum.includes(i)) {
                    platinum.push(i);
                    fs.writeFileSync('platinum.json', JSON.stringify(platinum));
                }

            }
        }
        catch(e) {
            console.log("no problem with id " + i + " found");
        }
    }
})();
