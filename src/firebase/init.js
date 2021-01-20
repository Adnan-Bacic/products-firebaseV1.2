import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration


var firebaseConfig = {
    apiKey: "AIzaSyCFcZ9KMBuwVOgFYze8gMTP1kp9l04EKig",
    authDomain: "products-1.firebaseapp.com",
    databaseURL: "https://products-1.firebaseio.com",
    projectId: "products-1",
    storageBucket: "products-1.appspot.com",
    messagingSenderId: "832401026669",
    appId: "1:832401026669:web:a0617e3c4534772c37d964"
  };
  

  
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);


  const firebaseapp = firebase.initializeApp(firebaseConfig);
  //firebaseapp.firestore().settings({ timestampsInSnapshots:true });

  //export default firebaseapp.firestore();
  //new export for file upload
  export default firebaseapp