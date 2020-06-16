const route = require("express").Router();
const { Checkout } = require("checkout-sdk-node");
const cko = new Checkout("sk_test_07fa5e52-3971-4bab-ae6b-a8e26007fccc");

route.post("/payWithToken", async (req, res) => {
  const payment = await cko.payments.request({
    source: {
      token: req.body.token
    },
    currency: "EUR",
    amount: 2000, // pence
    reference: "TEST-ORDER"
  });
  res.send(payment);
});

route.post("/payWithIdeal", async (req, res) => {
  const payment = await cko.payments.request({
    source: {
      type: "ideal",
      bic: "INGBNL2A",
      description: "ORD50234E89",
      language: "nl"
    },
    currency: "EUR",
    amount: 2000, // pence
    success_url: req.body.url + "/success",
    failure_url: req.body.url + "/fail"
  });
  res.send(payment);
});

// Get payment details by cko-session-id
route.post("/getPaymentBySession", async (req, res) => {
  const details = await cko.payments.get(req.body.sessionId);
  res.send(details);
});

module.exports = route;
