/*global 
require 
exports 
*/

const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { getSets, checkSet } = require("./cards/checkCards");
const { getMixedDeck } = require("./cards/allCards");
const { shuffle } = require("./game_shuffle");
const { submitSet } = require("./game_submitSet");
const { requestToJoin, respondToRequest } = require("./gameRequests");
const { createGame } = require("./create_game");

exports.getCards = functions.https.onRequest((req, res) => {
  const mixedDeck = getMixedDeck();
  res.status(200).json({ mixedDeck, sets: getSets(mixedDeck.slice(0, 12)) });
});

exports.createGame = createGame;

exports.shuffle = shuffle;
exports.submitSet = submitSet;

exports.requestToJoin = requestToJoin;
exports.respondToRequest = respondToRequest;
