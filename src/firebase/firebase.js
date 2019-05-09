import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export { firebase, db as default };

// db.ref('expenses').on('value', (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });

// db.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// db.ref('expenses').push({
//   description: 'gas',
//   amount: 0,
//   note: 'I dont have a car',
//   createdAt: 12
// });

// const onValueChange = db.ref().on('value', (snapshot) => {
//   const { name, job } = snapshot.val();
//   console.log(`${name} is a ${job.title} at ${job.company}`);
// });

// setTimeout(() => {
//   db.ref('name').set('Sraciek');
// }, 3000);

// db.ref().set({
//   name: 'maciek',
//   age: 28,
//   stressLevel: 9000,
//   job: {
//     title: 'developer',
//     company: 'dupsko'
//   },
//   location: {
//     city: 'poznan',
//     country: 'polsza'
//   }
// });

// db.ref('attributes')
//   .set({
//     height: 175,
//     weight: 80
//   })
//   .then(() => {
//     console.log('request sent');
//   })
//   .catch((e) => {
//     console.log('Error: ', e);
//   });

// db.ref().update({
//   stressLevel: 2,
//   job: {
//     title: 'fencing master',
//     company: 'Geselschaft Liechtenauers'
//   },
//   'location/city': 'Danzig'
// });
