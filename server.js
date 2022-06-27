import express from 'express';
import mongoose from 'mongoose'; 
import Cors from 'cors';

import Cards from './dbCards.js';

// App config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:yaNZc9F1IBrvolWI@cluster0.holkur8.mongodb.net/tinderdb?retryWrites=true&w=majority'

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config (   problem area   )
mongoose.connect(connection_url, {
    //useNewUrlParser: true,
   // useCreateIndex: true,
    //useUnifiedTopology: true,
});


// API Endpoints
app.get("/", (req, res) => res.status(200).send("HELLO WORLD"));

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
        
    });
});

app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
        
    });
});


// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));