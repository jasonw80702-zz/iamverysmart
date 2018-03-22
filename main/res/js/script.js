$(document).ready(function() {

	var key = "e23ef711402f05ed77a453b933ea3b8a"; // TODO: move to server side
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
			// need this to wait for response
			async: false,
			dataType: "json",
			success: callback,
			error: function(xhr, ajaxOptions, thrownError) {
				handleError(xhr.status, xhr.statusText);
			}
		});
	};

	// ALG1: based on longest length synonym
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

	// TODO: ALG2: random synonyms and create multiple results

	handleError = function(status, statusText) {
		console.log("Status: {" + status + "} StatusText: {" + statusText + "}")
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
			max.length === 0 ? result.push(words[i]) : result.push(max);
		}
		return result;
	};

	$("#submit-btn").click(function() {
		var content = $("#content").val();
		if (content) {
			// loop through all words in sentence
			var words = content.split(" ");
			var result = processWords(words);
			displayText(result.join(' '));
		}
	});
});


// todo: modal pop up to select which words to smartify
// make one call, then show modal of words to get synonyms of
// handle punctuation
// add recent searched sentences??