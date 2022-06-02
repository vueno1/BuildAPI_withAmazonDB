const express = require('express');
const request = require('request-promise');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
    
// //desde la pagina de ScraperApi, inicio sesion y obtengo mi key.
//con este url obtengo la lista de productos.
const baseUrl = `http://api.scraperapi.com?api_key=${process.env.API_KEY}&autoparse=true`;

app.use(express.json())

//=============Routes====================//
app.get("/", (req, res) => {
    res.send("welcome to Amazon API");
});

//GET PRODUCT DETAILS 
app.get("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    try {

        ///BUSCAMOS LOS PRODUCTOS A TRAVES DE LA URL///
        //este link nos va a dar la informacion de un especifico producto.
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
        //hacemos JSON.parse para que se vea bien el resultado.
        res.json(JSON.parse(response))
    }
    catch (err) {
        res.json(err)
    }
});

//GET PRODUCT REVIEWS
app.get("/products/:productId/reviews", async (req, res) => {
    const { productId } = req.params;
    try {
        ////BUSCAMOS LAS REVIEWS A TRAVES DEL LINK////
        //este link nos va a dar la informacion de un especifico producto.
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response))
    }
    catch (err) {
        res.json(err)
    }
});

//GET PRODUCT OFFERS
app.get("/products/:productId/offers", async (req, res) => {
    const { productId } = req.params;
    try  {
        ////BUSCAMOS LAS REVIEWS A TRAVES DEL LINK////
        //este link nos va a dar la informacion de un especifico producto.
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response))
    }
    catch (err) {
        res.json(err)
    }
});

//GET SEARCH RESULTS
//en el navegador ponemos: http://localhost:3000/search/macbook air → y automaticamente lo encuentra 
//cambiando el macbook air x macbook%20air
app.get("/search/:searchQuery", async (req, res) => {
    const { searchQuery } = req.params;
    try  {
        ////BUSCAMOS LAS REVIEWS A TRAVES DEL LINK////
        //este link nos va a dar la informacion de un especifico producto.
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response))
    }
    catch (err) {
        res.json(err)
    }
});


//=================================PORT===//
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
