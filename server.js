const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection')
const inputCheck = require('./utils/inputCheck.js');
const apiRoutes = require('./routes/apiRoutes');

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Use apiRoutes
app.use('/api', apiRoutes);

//Default response for any other request (Not Found). 
//This is known as a catchall route. This needs to be towards the bottom.
app.use((req, res) => {
    res.status(404).end();
});

//Start server after DN connection.
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});