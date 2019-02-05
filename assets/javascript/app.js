  var config = {
    apiKey: "AIzaSyBpuMhoVZ2cHbKdkdP7kdVaac7Wq8tUOxU",
    authDomain: "train-times-d29ec.firebaseapp.com",
    databaseURL: "https://train-times-d29ec.firebaseio.com",
    projectId: "train-times-d29ec",
    storageBucket: "train-times-d29ec.appspot.com",
    messagingSenderId: "230385776011"
  };

  firebase.initializeApp(config);

  // Reference to the database service
  var database = firebase.database();

  // Selectors
  var selectors = {
    submitBtn: "#train-submit",
    nameInput: "#name-input",
    destInput: "#destination-input",
    timeInput: "#time-input",
    freqInput: "#frequency-input"
  };
  // Listeners

  // Function to pull data from the input boxes
  $(selectors.submitBtn).on("click", function(event){
      event.preventDefault();

      var name = $(selectors.nameInput).val().trim();
      var destination = $(selectors.destInput).val().trim();
      var time = moment($(selectors.timeInput).val().trim(), "HH:mm").format("X");
      var frequency = $(selectors.freqInput).val().trim();
  
  // Code for setting values in the database
      var newTrain = {    
        name: name,
        dest: destination,
        time: time,
        freq: frequency
      };

  // Uploads train info to the database    
  database.ref().push(newTrain);    

  // Clears the text-boxes
  $(selectors.nameInput).val("");
  $(selectors.destInput).val("");
  $(selectors.timeInput).val("");
  $(selectors.freqInput).val("");
  });

  // Firebase watcher and initial loader
  database.ref().on("child_added", function(childSnapshot){
  
  // Log everything (value) coming out of childSnapshot  
  console.log(childSnapshot.val().name)
  console.log(childSnapshot.val().dest)
  console.log(childSnapshot.val().time)
  console.log(childSnapshot.val().freq)

  // Create variables for the values coming from Firebase
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().freq;
  console.log(trainTime)

  // Capture the difference between the first train and the current time
  var difference = moment().diff(moment(trainTime, "X"), "minutes");
  console.log(difference)

  // Calculate the remainder 
  var remainder = difference % trainFreq;
  console.log(remainder)

  // Calculate minutes away
  var minsAway = trainFreq - remainder;
  console.log(minsAway)

  // Calculate next arrival time using first train time and freq
  var arrivalTime = moment().add(minsAway, "minutes").format("hh:mm A");
  console.log(arrivalTime)
 
  
  // Create new row
  var newRow = 
  $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(arrivalTime),
      $("<td>").text(minsAway),
    );
  $("#train-schedule > tbody").append(newRow);

  })
