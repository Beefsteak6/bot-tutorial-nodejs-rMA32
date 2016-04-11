var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var clash_caller_ID = 0;
var Beer = String.fromCharCode(0xD83C,0xDF7A);
var Beers = String.fromCharCode(0xD83C,0xDF7A);

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy/;
      botRegexSalt = /^\/salt/;
      botRegexRules = /^\/rules/;
      botBeer = /^\/getsixpack/;
      botRegexSh = /^\/shrug/; 
      botRegexSCC = /^\/setclashcaller/;
      botRegexGCC = /^\/getclashcaller/;
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  } 
  else if(request.text && botRegexSalt.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.imgur.com/B5BSVqH.png");
    this.res.end();
  } 
  else if(request.text && botRegexRules.test(request.text)) {
    this.res.writeHead(200);
    postMessage("These are my rules.  Follow them or else.");
    this.res.end();
  } 
  else if(request.text && botRegexSh.test(request.text)) {
    this.res.writeHead(200);
    postMessage("¯\\_(ツ)_/¯");
    this.res.end();
  } 
  else if(request.text && botBeer.test(request.text)) {
    this.res.writeHead(200);
    postMessage(Beers+Beers+Beers+Beers+Beers+Beers);
    this.res.end();
  }
  else if(request.text && botRegexSCC.test(request.text)) {
    this.res.writeHead(200);
    clash_caller_ID = request.text.substring(16,request.text.length);
    postMessage("Clash Caller set to: " + clash_caller_ID);
    //var rep = req.replace(/ /,"+");
    this.res.end();
  } 
  else if(request.text && botRegexGCC.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.clashcaller.com/war/" + clash_caller_ID);
    //var rep = req.replace(/ /,"+");
    this.res.end();
  } 
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
  
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
