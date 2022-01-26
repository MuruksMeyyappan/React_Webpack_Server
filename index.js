require('dotenv').config();
const express = require('express')
var cors = require("cors");
const postRoute = require("./routes/post");

const app = express()
// middleware
app.use(cors());

const Stripe = require('stripe')

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

app.use(express.json());

app.use("/api/v1/", postRoute);

app.post('/pay',async (req,res) => {
    try {
        const amount = 2000;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            payment_method_types: ["card"],
            metadata: {
              name: "value",
            },
          });
          const clientSecret = paymentIntent.client_secret;
          res.json({ clientSecret, message: "Payment Initiated" });
    } 
    catch(err){
        console.error(err)
        res.send(500).json({message: 'Internal server error'})
    }
})


app.post('/stripe',(req,res) => {
    if(req.body.type === 'payment_intent.created'){
        console.log(`${req.body.data.object.metadata.name} initiated payment`);
    }

    if(req.body.type === 'payment_intent.succeeded'){
        console.log(`${req.body.data.object.metadata.name} succeeded payment`);
    }
})

app.listen(5000,()=> console.log("server is running on Port ::: 5000"))
 