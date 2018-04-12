/*
	System Driver
	Author : Nan Cao (nancao.org)
*/
var component = vis.component().size([940, 580]);

d3.json("data/german_credit_sample.json", function(error, json) {
	if (error) {
		console.log(error)
		return;
	}
	console.log(json);
	component.data(json).layout().render();
});

// layout UI and setup events
$(document).ready(function() {
	// init data list
	$.get("/list", function(d) {
		$("#dataset").empty();
		d = $.parseJSON(d);
		d.forEach(function(name) {
			$("#dataset").append(
				"<option>" + name + "</option>"
			);
		});
		display();
	});
	
	$("#tabs").tabs();
	$("#tablists").tabs();
	
	wire_events();
});

//////////////////////////////////////////////////////////////////////
// local functions
function wire_events() {
};

function display() {
	// clean contents
	d3.select("#view").selectAll("*").remove();
	
	// load datasets
	var data = $('#dataset').val();
	if(!data || data == '') {
		return;
	}
	
	component.container(d3.select("#mainview").append("svg"))
	
	var url = "data/" + "us-state-centroids.json";
	console.log("file name?:", url);
	// d3.json(url)
	// 	.get(function(err, json) {
	// 		if (err) return console.error(err);
	// 		console.log(json);
	// 		component.data(json).layout().render();
	// 	});
	
	d3.json("https://dl.dropboxusercontent.com/s/xyrgiyop23ql0t8/german_credit_sample.json?dl=1", function(error, jsondata) {
		if (error) {
			console.log(error)
			return;
		}
		console.log(jsondata);
		component.data(jsondata).layout().render();
	});
};

function displaydata() {
	console.log("display data?")
}
