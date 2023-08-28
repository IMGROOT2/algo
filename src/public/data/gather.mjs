import fs from 'fs'
import { JSDOM } from 'jsdom'

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))

;(async () => {
  for (let i = 0; i <= 2000; i++) {
    // 2000 is a rough max of CPIDs
    try {
      console.log('Trying ' + i + '...')
      const response = await fetch('http://usaco.org/index.php?page=viewproblem2&cpid=' + i)
      const body = await response.text()
      const dom = new JSDOM(body)
      const problem = dom.window.document.getElementById('probtext-text').innerHTML
      const subtitle = body.match(/<h2>(.*?)<\/h2>/)[1].trim()
      // set subtitle to the innertext of the second <h2> element
      const title = dom.window.document.getElementsByTagName('h2')[1].innerHTML.trim()
      const number = body.match(/Problem.*?(\d+)/)[1]
      const division = subtitle.match(/Bronze|Silver|Gold|Platinum/)[0].toLowerCase()
      const year = subtitle.match(/20\d\d/)[0]
      if (year > 2015) {
        console.log('ID ' + i + ' is in ' + year + ' and is ' + division + '.')
        if (data[division].indexOf(i) === -1) {
          console.log(subtitle)
          var toPush = {
            title: title,
            subtitle: subtitle,
            id: i,
            year: year,
            division: division,
            number: number,
            problem: problem,
            url: 'http://usaco.org/index.php?page=viewproblem2&cpid=' + i
          }
          data[division].push(toPush)
          console.log('Added to ' + division + '.')
        }
        fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
      } else {
        console.log('ID ' + i + ' is too old (' + year + ').')
      }
    } catch (e) {
      console.log(e.message)
      console.log('ID ' + i + " doesn't exist.")
    }
  }
  console.log('Done!')
})()
