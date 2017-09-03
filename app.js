 var config = {
    apiKey: "AIzaSyB2aSVQHrUs6VGOqfVAZqFuHz_PoEYx2qg",
    authDomain: "trainscheduler-46624.firebaseapp.com",
    databaseURL: "https://trainscheduler-46624.firebaseio.com",
    projectId: "trainscheduler-46624",
    storageBucket: "trainscheduler-46624.appspot.com",
    messagingSenderId: "1056163348045"
  };
  firebase.initializeApp(config);
	firebase.database().ref();

 	$("#addTrainBtn").on("click", function(){

	var trainName = $("#trainNameInput").val().trim();
	console.log(trainName);
	var destination = $("#destinationInput").val().trim();
	var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

		var newTrain = {
		name:  trainName,
		destination: destination,
		trainTime: TrainTimeInput,
		frequency: frequencyInput
}

	trainData.push(newTrain);
	console.log(trainData);

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#trainTimeInput").val("");
	$("#frequencyInput").val("");

	// return false;

trainData.on("child_added", function(childSnapshot, prevChildKey){
	var rideName = childSnapshot.val().name;
	var rideDestination = childSnapshot.val().destination;
	var rideFrequency = childSnapshot.val().frequency;
	var ridetrainTime = childSnapshot.val().trainTime;

	var rideMinutes = rideFrequency - timeRemainder;

	var diffTime = moment().diff(moment.unix(ridetrainTime), "minutes");
	var timeRemainder = moment().diff(moment.unix(ridetrainTime), "minutes") % rideFrequency ;
    var rideminutes = rideFrequency - timeRemainder;

	var rideArrival = moment().add(rideMinutes, "m").format("hh:mm A"); 
	
	$("#trainTable > tbody").append("<tr><td>" + rideName + "</td><td>" + rideDestination + "</td><td>" + rideFrequency + "</td><td>" + rideArrival + "</td><td>" + rideMinutes + "</td></tr>");

});
