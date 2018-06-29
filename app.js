
  
  
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-No9J69q9OiED4MmkbV1IzUwaI6jlbxw",
    authDomain: "cbc-june.firebaseapp.com",
    databaseURL: "https://cbc-june.firebaseio.com",
    projectId: "cbc-june",
    storageBucket: "cbc-june.appspot.com",
    messagingSenderId: "447999332501"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#new-train").on("submit", function(event) {
    event.preventDefault();


    var trainName = $("#name-input").val().trim();
    var trDesti = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trFreq = $("#Freq-input").val().trim();

    var newTrain = {
        name: trainName,
        Destination: trDesti,
        Time: trainTime,
        Freq: trFreq
    };


    database.ref().push(newTrain); 

    console.log(newTrain.name);
    console.log(newTrain.Destination);
    console.log(newTrain.Time);
    console.log(newTrain.Freq);

    // Alert
  alert("Your Train Has Successfully Been Added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#Freq-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Move everything into a variable.
    var trainName = childSnapshot.val().name;
    var trDesti = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().Time;
    var trFreq = childSnapshot.val().Freq;
  
    // // Train Info
    // console.log(trainName);
    // console.log(trDesti);
    // console.log(trainTime);
    // console.log(trFreq);
  
    // Prettify the employee start
    var prettyTrainTime = moment.unix(trainTime).format("HH:mm");
  
    // Calculation to convert military time to local time
    var trainMil =  moment().endOf('hour').fromNow(); 
    // var trainMil = moment().diff(moment(trainTime).fromNow()
    console.log(trainMil);
  
    // Calculate the train time arrival for each incoming train...
    var trArriv = trainMil * trFreq;
   
  
    // move the train data into the table above.
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trDesti + "</td>" + "<td>" + trainMil + "</td><td>" + trFreq + "</td><td>" + trArriv + "</td></tr>");
  });
