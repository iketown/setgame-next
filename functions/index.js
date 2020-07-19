const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { getSets, checkSet } = require("./cards/checkCards");
const { getMixedDeck } = require("./cards/allCards");
const { getUniqueName } = require("./games/uniqueName");

exports.getCards = functions.https.onRequest((req, res) => {
  const mixedDeck = getMixedDeck();
  res.status(200).json({ mixedDeck, sets: getSets(mixedDeck.slice(0, 12)) });
});

exports.createGame = functions.https.onCall(async (data, ctx) => {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  const uid = ctx.auth.uid;
  const { private } = data;
  const _private = Boolean(private);
  const gameId = getUniqueName();
  const refString = `games/${gameId}`;
  const startedAt = new Date().toISOString();
  return admin
    .database()
    .ref(refString)
    .set({
      startedAt,
      adminUid: uid,
      private: _private,
    })
    .then(() => ({ refString, gameId }));
});

exports.setupGame = functions.database
  .ref(`/games/{gameId}`)
  .onCreate(async (snapshot, context) => {
    const value = snapshot.val();
    const { gameId, publicOrPrivate } = context.params;
    console.log("context", context.params);
    console.log("value! hello", value);
  });

// exports.setupGame = functions.database
//   .ref(`/games/{gameId}/players`)
//   .onCreate((snapshot, context) => {
//     const fullDeck = getMixedDeck();
//     const onBoard = fullDeck.slice(0, 12);
//     const onDeck = fullDeck.slice(12);
//     const sets = getSets(onBoard);
//     return snapshot.ref.parent.update({ onBoard, onDeck, sets });
//   });

exports.testListener = functions.database.ref(`/games/{gameId}/players`);

exports.submitSet = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const { cards, gameId } = data;
  const db = admin.database();
  if (!checkSet(cards)) {
    // wrong set!  must punish!
  }
  const { onBoard, onDeck, players } = await db
    .ref(`games/${gameId}`)
    .once("value")
    .then((snap) => snap.val());
  console.log({ onBoard, onDeck, players });
  return db.ref(`games/${gameId}`).update({});
});
