const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('단국 꾸러기 코딩단')
});


const port = 5000;
app.listen(port, console.log(`The application is listening on ${port}`));