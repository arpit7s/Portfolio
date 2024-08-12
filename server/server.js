require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router')
const adminRoute = require('./router/admin-router')
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
const serviceRoute = require('./controllers/service-controller');
const app = express();

const PORT = 5000;
// takle cors 
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());



//admin panel
app.use('/api/admin', adminRoute);
app.use('/api/admin', adminRoute);




//Route
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use('/api/data', serviceRoute)

app.use(errorMiddleware);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Your Server Connected To The Port No. ${PORT} `);
    });
})



