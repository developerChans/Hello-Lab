const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('단국 꾸러기 코딩단')
});

app.get('/test', (req,res) => {
    res.send('이거 예시');
});

const port = 5000;
app.listen(port, console.log(`The application is listening on ${port}`));