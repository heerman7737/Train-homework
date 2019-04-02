const config = {
    apiKey: "AIzaSyBBWmkwkUtufiMUYG5kR3shDGGts0JLFD0",
    authDomain: "secondfirebase-74f0a.firebaseapp.com",
    databaseURL: "https://secondfirebase-74f0a.firebaseio.com",
    projectId: "secondfirebase-74f0a",
    storageBucket: "secondfirebase-74f0a.appspot.com",
    messagingSenderId: "2211263094"
  };
  firebase.initializeApp(config);
  let db=firebase.firestore();
  let name,destination,firstTime,frequency
  document.getElementById("submit").addEventListener("click",e=>{
    e.preventDefault();
    let name=document.getElementById("trainName").value.trim();
    console.log(name);
    let destination=document.getElementById("trainDestination").value.trim();
    console.log(destination)
    let firstTime=document.getElementById("firstTrainTime").value.trim();
    console.log(firstTime)
    let frequency=document.getElementById("frequency").value.trim();
    console.log(frequency)
    db.collection("Trains").doc(document.getElementById("trainName").value).set({
        name: name,
        destination:destination,
        firstTime:firstTime,
        frequency:frequency

     })
     document.getElementById("trainName").value=""
     document.getElementById("trainDestination").value=""
     document.getElementById("firstTrainTime").value=""
     document.getElementById("frequency").value=""

  })
  db.collection('Trains').onSnapshot(({docs})=>{
    docs.forEach(doc=>{
        console.log(doc.data())
        let {name,destination,firstTime,frequency}=doc.data()
        let currentTrain=document.createElement("tr")
        
        let startTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(startTimeConverted);

        let now = moment();
        console.log(moment(now).format("HH:mm"));
        let minutesSinceStart = moment().diff(moment(startTimeConverted), "minutes");
        console.log(minutesSinceStart);
        let minutesDiff  = minutesSinceStart % frequency;
        console.log(minutesDiff);
        let minutesUntil = frequency - minutesDiff;
        let trainTime = moment(now).add(minutesUntil, "minutes").format("HH:mm")
        currentTrain.innerHTML=`
        <tr>
            <td>${name}</td>
            <td>${destination}</td>
            <td>${firstTime}</td>
            <td>${frequency}</td>
            <td>${trainTime}</td>
            <td>${minutesUntil}</td>`
        document.getElementById("tableContent").append(currentTrain)


    })
})