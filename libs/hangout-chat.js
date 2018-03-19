const salesforce = require("./salesforce.js");

const infoMessage = `Thanks for adding me!`;
const commandMessage = `You can ask me the following commands:

list accounts <account name>
list opportunities <opportunity name>`;

exports.securityCheck = (req, res) => {
  const token = req.body.token;
  if (token === process.env.GOOGLE_CHAT_TOKEN) {
    return true;
  }
  res.sendStatus(401);
  return false;
};

exports.processChat = (msg, res) => {
  res.setHeader("Content-Type", "application/json");
  var answer = {};
  if (msg.type === "ADDED_TO_SPACE" && msg.space.type === "ROOM") {
    answer.text = infoMessage;
    res.end(JSON.stringify(answer));
  } else if (msg.type === "MESSAGE") {
    processBasicChat(msg.message.text, res);
  }
};

processBasicChat = (message, res) => {
  var answer = {};
  if (message.match("list accounts .*")) {
    const searchKeyword = message.replace("list accounts ", "");
    const searchQuery =
      "SELECT Id, AccountNumber, Name FROM Account WHERE Name='" +
      searchKeyword +
      "' LIMIT 1";
    salesforce.queryForBot(searchQuery).then(accounts => {
      if (accounts && accounts.length > 0) {
        answer = buildBotResponseCard(
          "Account",
          "Account No",
          accounts[0].get("AccountNumber"),
          "Account Name",
          accounts[0].get("Name"),
          "Open Account record",
          accounts[0].get("Id")
        );
      } else {
        answer.text = "No account matching the criteria found.";
      }
      res.end(JSON.stringify(answer));
    });
  } else if (message.match("list opportunities .*")) {
    const searchKeyword = message.replace("list opportunities ", "");
    const searchQuery =
      "SELECT Id, Name, Amount FROM Opportunity WHERE Name='" +
      searchKeyword +
      "' LIMIT 1";
    salesforce.queryForBot(searchQuery).then(opptys => {
      if (opptys && opptys.length > 0) {
        answer = buildBotResponseCard(
          "Opportunity",
          "Opportunity Name",
          opptys[0].get("Name"),
          "Amount",
          opptys[0].get("Amount"),
          "Open Opportunity record",
          opptys[0].get("Id")
        );
      } else {
        answer.text = "No opportunity matching the criteria found.";
      }
      res.end(JSON.stringify(answer));
    });
  } else {
    answer.text = commandMessage;
    res.end(JSON.stringify(answer));
  }
};

buildBotResponseCard = (
  type,
  fieldLabel1,
  fieldValue1,
  fieldLabel2,
  fieldValue2,
  urlTitle,
  id
) => {
  var answer = {};
  var cards = [];
  var card = {};
  card.sections = [];
  var cardHeader = {};
  cardHeader.title = "Salesforce " + type;
  cardHeader.subtitle = "via basic bot";
  card.header = cardHeader;
  var cardSections = [];
  var cardWidgets = {};
  cardWidgets.widgets = [];
  var cardWidget = {};
  cardWidget.keyValue = {};
  cardWidget.keyValue.topLabel = fieldLabel1;
  cardWidget.keyValue.content = fieldValue1;
  cardWidgets.widgets.push(cardWidget);
  cardWidget = {};
  cardWidget.keyValue = {};
  cardWidget.keyValue.topLabel = fieldLabel2;
  cardWidget.keyValue.content = fieldValue2;
  cardWidgets.widgets.push(cardWidget);
  cardSections.push(cardWidgets);
  cardWidgets = {};
  cardWidgets.widgets = [];
  var buttons = {};
  buttons.buttons = [];
  var button = {};
  button.textButton = {};
  button.textButton.text = urlTitle;
  button.textButton.onClick = {};
  button.textButton.onClick.openLink = {};
  button.textButton.onClick.openLink.url =
    process.env.SALESFORCE_MY_DOMAIN +
    "/lightning/r/" +
    type +
    "/" +
    id +
    "/view";
  buttons.buttons.push(button);
  cardWidgets.widgets.push(buttons);
  cardSections.push(cardWidgets);
  card.sections = cardSections;
  cards.push(card);
  answer.cards = cards;
  return answer;
};
