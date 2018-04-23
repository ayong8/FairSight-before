/*
	System Driver
	Author : Nan Cao (nancao.org)
*/
var component = vis.component().size([940, 580]),
	component2 = vis.component2().size([940, 580]),
	verticalView = vis.component3().size([300, 580]),
	overview = vis.overview().size([300, 300]);

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
	
	component.container(d3.select("#hview1").append("svg").attr("class", "svg_hview"));
	component2.container(d3.select("#mainview_plot").append("svg").attr("class", "svg_mainview"));
	verticalView.container(d3.select("#vview1").append("svg").attr("class", "svg_vview"));
	overview.container(d3.select("#overview").append("svg").attr("class", "svg_overview"));
	
	
	var url = "data/" + "us-state-centroids.json";
	
	d3.json("https://dl.dropboxusercontent.com/s/xyrgiyop23ql0t8/german_credit_sample.json?dl=1", function(error, jsondata) {
		if (error) {
			console.log(error)
			return;
		}
		component.data(jsondata).layout().render();
		component2.data(jsondata).layout().render();
		verticalView.data(jsondata).layout().render();
		overview.data(jsondata).layout().render();
	});
};

function displaydata() {
	console.log("display data?")
}
