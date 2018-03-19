$(document).ready(function() {

	var key = "e23ef711402f05ed77a453b933ea3b8a";
	var url = "http://words.bighugelabs.com/api/2/";

	createUrlForWord = function(word) {
		return url + key + "/" + word + "/json";
	};

	getJSONRequest = function(url) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: "json",
			success: callback,
			error: function(xhr, ajaxOptions, thrownError) {
				var status = xhr.status;
				var statusText = xhr.statusText;
				debugger;
			}
		});
	};

	callback = function(data) {
		// data is already in JSON format
		debugger;
		// todo: convert data from format wordType|compareType|word 
		// into list of objects
	};

	handleError = function(status, statusText) {
		// handle error
		// status: 404
		// statusText: Not Found
	};

	displayText = function(result) {
		$("#result").text(result);
		$("#result").show();
	};

	$("#submit-btn").click(function() {
		var content = $("#content").val();
		if (content) {
			// loop through all words in setence
			var a = createUrlForWord("fsasdasdasd");
			getJSONRequest(a);
			var result;
			displayText(result);
		}
	});
});


// todo: modal pop up to select which words to smartify
// make one call, then show modal of words to get synonyms of