
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world 2!");
});

Parse.Cloud.define("sendPushToUser", function(request, response) {
	var senderUser = request.user;
  	var recipientPhoneNumber = request.params.recipientPhoneNumber;
  	var jsonData = request.params.data;
  
  	var pushQuery = new Parse.Query(Parse.Installation);
  	pushQuery.equalTo("phoneNumber", recipientPhoneNumber);
  	
  	Parse.Push.send({
    	where: pushQuery,
    	data: jsonData,
  	}).then(function() {
      	response.success("Push was sent successfully."+recipientPhoneNumber)
  		}, function(error) {
      		response.error("Push failed to send with error: " + error.message);
  	});
});
