# salesforce-google-hangouts-chat-apex-webhook

This repo showcases how to send a webhook to a Google Hangouts Chat room using Apex and Process Builder.

Read more about it in this [blog post](https://developer.salesforce.com/blogs/2018/03/integrating-hangouts-chat-and-salesforce.html).

And don't forget to check out the other repos:
- [Chat Webhook with Apex and Process Builder](https://github.com/muenzpraeger/salesforce-google-hangouts-chat-apex-webhook)
- [Einstein Intent powered Salesforce Chat bot](https://github.com/muenzpraeger/salesforce-google-hangouts-chat-einstein-bot)

## Pre-Requisites

You need to have an active G Suite organization (sign-up [here](https://www.salesforce.com/campaign/google/) as a Salesforce customer if you don't have one).

The [Chat documentation explains](https://developers.google.com/hangouts/chat/how-tos/webhooks) in detail how to setup Hangouts Chat bots.

## Deploy to Heroku

Deploy the app to Heroku using the deploy button.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

* *SALESFORCE_CONSUMER_KEY* - enter the Connected App consumer key
* *SALESFORCE_CONSUMER_SECRET* - enter the Connected App consumer secret
* *SALESFORCE_USERNAME* - enter the name of the Salesforce integration user
* *SALESFORCE_PASSWORD* - enter the password of the Salesforce integration user
* *GOOGLE_CHAT_TOKEN* - enter the Google Hangouts Chat token

## Installation with Salesforce DX

Clone the repo to your local file system.

```
git clone https://github.com/muenzpraeger/salesforce-google-hangouts-chat-apex-webhook
```

Change into the git repo directory and create a new scratch org.

```
sfdx force:org:create -a apexWebhook -s -f config/project-scratch-def.json
```

Push the source to the newly created org.
```
sfdx force:source:push
```

Open the scratch org.

```
sfdx force:org:open
```

Create a new version of the _Google Hangouts Chat_ Process Builder flow and update it with a webhook URL of one of your Chat rooms.

## License

For licensing see the included [license file](https://github.com/muenzpraeger/salesforce-google-hangouts-chat-apex-webhook/blob/master/LICENSE.md).