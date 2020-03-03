const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys/webhooks', (req, res) => {
    // console.log(req.body);
    // res.send({});

    // Outside of the map statement because it doesn't need to be
    // created at each iteration, only once
    const p = new Path('/api/surveys/:surveyId/:choice');

    // chain()
    // Chain the current array to make possible to use many lodash functions

    // map()
    // Basic map function, just iterates trough it and return the array

    // compact()
    // Remove undefined elements from the array, which may come from other
    // events from sendgrid (like bounce)

    // uniqBy()
    // Retrieve unique elements inside an array, and specifying that
    // the thing that should differ them is the email and the surveyId

    // each() and exec()
    // Each just iterates through the array and it does not return it,
    // it just modifies it. Exec is a mongodb command to execute the
    // updateone command

    _.chain(req.body)
      .map(({ email, url }) => {
        // Retrieving survey ID and choice
        const match = p.test(new URL(url).pathname);

        if (match) {
          return {
            // Email coming from event
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // Send emails after creating the survey, and only then save the survey to mongo
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user._id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id
    }).select('-recipients');

    res.send(surveys);
  });
};
