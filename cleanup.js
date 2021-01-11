const path = require('path')
const fs = require('fs')

function processLine(line, store) {
    try {
        let [key, cat, num] = line.split('\t')
        if (key === 'YAN00302') {
            console.log(line)
        }
        if (store[key]) {
            if (cat && cat !== '') store[key].cat = cat.trim()
            if (num && num !== '') store[key].num = num.trim()
        } else {
            store[key] = { cat, num }
        }
    } catch (e) {
        console.error(e)
    }
}

function writeFile(store) {
    const fh = fs.createWriteStream('./out.csv', { flags: 'a' });

    for (const key in store) {
        fh.write(`"${key}", "${store[key].cat || ''}", "${store[key].num || ''}"\r\n`);
    }
}

async function main() {
    const file = fs.readFileSync('./data.tsv', 'utf-8')
    const store = {};

    file.split(/\r?\n/).forEach(line => processLine(line, store))
    
    writeFile(store)
}

main().catch(console.error)