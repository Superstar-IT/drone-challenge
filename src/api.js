const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');


app.use(cors());

app.get('/', (req, res) => {
    res.json({foo: 'bar'});
});

app.get('/instruction', async (req, res) => {
    const data = await fs.readFile(path.join(__dirname, '../sample-input.txt'));
    const instruction = data.toString();

    if(!instruction) {
        return res.status(400).send('instruction required');
    }

    const billBoards = {};
    let xVal = 0;
    let yVal = 0;

    [...instruction].map((item) => {
        switch (item) {
            case 'x':
                if(billBoards[`${xVal}_${yVal}`]) billBoards[`${xVal}_${yVal}`] += 1;
                else billBoards[`${xVal}_${yVal}`] = 1;
                break;
            case '^':
                yVal++;
                break;
            case 'v':
                yVal--;
                break;
            case '>':
                xVal++;
                break;
            case '<':
                xVal--;
                break;
            default:
                break;
        }
    });

    res.json({ answer: Object.keys(billBoards).length });
})

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

