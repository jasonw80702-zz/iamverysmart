$(document).ready(function() {

	var key = "e23ef711402f05ed77a453b933ea3b8a";
	var url = "http://words.bighugelabs.com/api/2/";

	var SYN = "syn";
	var SIM = "sim";

	var max = "";

	createUrlForWord = function(word) {
		return url + key + "/" + word + "/json";
	};

	getJSONRequest = function(url) {
		$.ajax({
			type: 'GET',
			url: url,
			async: false,
			dataType: "json",
			success: callback,
			error: function(xhr, ajaxOptions, thrownError) {
				handleError(xhr.status, xhr.statusText);
			}
		});
		console.log("hello");
	};

	callback = function(data) {
		for (var l in data) {
			var synonyms = data[l][SYN];
			for (var i = 0; i < synonyms.length; i++) {
				if (synonyms[i].length > max.length) {
					max = synonyms[i];
				}
			}
			break;
		}
	};

	handleError = function(status, statusText) {
		// handle error
		// status: 404
		// statusText: Not Found
		debugger;
	};

	displayText = function(result) {
		$("#result").text(result);
		$("#result").show();
	};

	processWords = function(words) {
		var result = [];
		for (var i = 0; i < words.length; i++) {
			max = "";
			var edit = words[i].replace(/[^A-Za-z_]/g, "");
			getJSONRequest(createUrlForWord(edit));
			debugger;
			max.length === 0 ? result.push(words[i]) : result.push(max);
		}
		return result;
	};

	$("#submit-btn").click(function() {
		var content = $("#content").val();
		if (content) {
			// loop through all words in setence
			var words = content.split(" ");
			var result = processWords(words);
			debugger;
			displayText(result.join(' '));
		}
	});
});


// todo: modal pop up to select which words to smartify
// make one call, then show modal of words to get synonyms of