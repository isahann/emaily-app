const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      source: req.body.id,
      amount: 500,
      currency: 'usd',
      description: 'Five credits for the Emaily app'
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
