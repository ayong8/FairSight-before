/*
	A code template for a visualization component
	Author : Nan Cao (nancao.org)
*/

vis.component = function() {
	console.log(this);
	var component = {},
		container = null,
		data = null,
		size = [960, 800],
	 	margin = {left:10, top:10, right:10, bottom:10},
		dispatch = d3.dispatch("select", "mouseover", "mouseout");

	component.container = function(_) {
		if (!arguments.length) return container;
		container = _;

		return component;
	};

	component.data = function(_) {
		if (!arguments.length) return data;

		data = _;
		console.log(data);
		return component;
	};

	component.size = function(_) {
		if (!arguments.length) return size;
		size = _;
		return component;
	};

	component.margin = function(_) {
		if (!arguments.length) return margin;
		margin = _;
		return component;
	};

	component.dispatch = dispatch;

	///////////////////////////////////////////////////
	// Private Parameters
    
	///////////////////////////////////////////////////
	// Public Function
	component.layout = function() {
		
		// random

		// var nodes = data.nodes;

		// for(var i = 0; i < nodes.length; +i) {
		// 	nodes[i].x = Math.random(); 
		// 	nodes[i].y = Math.random();
		// }
		
		return component;
	};

	component.render = function() {
	
		if(!container) {
			return;
		}
		var sampleData = data.slice(0, 40);
    	sampleData = sampleData.sort(function(a, b){ return d3.descending(a.rank_svm_saw, b.rank_svm_saw); });

		var g_title = container.append("g")
					.attr("transform", "translate(10, 50)"),
			g_name = container.append("g")
					.attr("transform", "translate(10, 50)"),
			g_total_score = container.append("g")
					.attr("transform", "translate(30, 50)"),
			g_attr1 = container.append("g")
					.attr("transform", "translate(150, 40)"),
			g_attr2 = container.append("g")
					.attr("transform", "translate(200, 40)"),
			g_rank_svm = container.append("g")
					.attr("transform", "translate(350, 40)");

		var xScale_total_score = d3.scaleLinear()
								.range([5, 50])
								.domain(d3.extent(sampleData, function(d){ return d.credit_amount; })),
			xScale_attr1 = d3.scaleLinear()
								.range([10, 40])
								.domain(d3.extent(sampleData, function(d){ return +d.credit_amount; })),
			xScale_attr2 = d3.scaleLinear()
								.range([10, 40])
								.domain(d3.extent(sampleData, function(d){ return +d.age; })),
			xScale_rank_svm = d3.scaleLinear()
								.range([10, 40])
								.domain(d3.extent(sampleData, function(d){ return +d.rank_svm_saw; })),
			yScale = d3.scaleBand()
					.rangeRound([20, size[1]-50])
					.domain(sampleData.map(function(d){ return d.id; }));

		g_title.append("text")
			.attr("x", 0)
			.attr("y", 0)
			.text("ID");
		g_title.append("text")
			.attr("x", 30)
			.attr("y", 0)
			.text("Total Score");
		g_title.append("text")
			.attr("x", 140)
			.attr("y", 0)
			.text("Cred_a");
		g_title.append("text")
			.attr("x", 190)
			.attr("y", 0)
			.text("Age");
		g_title.append("text")
			.attr("x", 340)
			.attr("y", 0)
			.text("rank_svm + simple additive weight");
	
		g_name.selectAll(".id")
			.data(sampleData)
			.enter().append("text")
			.attr("class", function(d, i){
				console.log(d.id);
				return "id id_" + d.id;
			})
			.attr("x", 0)
			.attr("y", function(d, i){
				return yScale(d.id);
			})
			.style("font-size", "11px")
			.text(function(d, i){ return d.id; });
		
		g_total_score.selectAll(".total_score_rect")
			.data(sampleData)
			.enter().append("text")
			.attr("class", function(d){
				return "total_score_rect rect_" + d.id;
			})
			.attr("x", 0)
			.attr("y", function(d, i){
				return yScale(d.id);
			})
			.text(function(d){
				console.log(d.default);
				return d.default==0? "would pay back": "would default";
			});
		
		g_attr1.selectAll(".total_score_rect")
			.data(sampleData)
			.enter().append("rect")
			.attr("class", function(d){
				return "total_score_rect rect_" + d.id;
			})
			.attr("x", 0)
			.attr("y", function(d, i){
				return yScale(parseInt(d.id));
			})
			.attr("width", function(d){
				return xScale_attr1(d.credit_amount);
			})
			.attr("height", 10)
			.style("fill", "moccasin");
		
		g_attr2.selectAll(".total_score_rect")
			.data(sampleData)
			.enter().append("rect")
			.attr("class", function(d){
				return "total_score_rect rect_" + d.id;
			})
			.attr("x", 0)
			.attr("y", function(d, i){
				return yScale(d.id);
			})
			.attr("width", function(d){
				return xScale_attr2(d.age);
			})
			.attr("height", 10)
			.style("fill", "moccasin");
		
		g_rank_svm.selectAll(".rank_svm_rect")
			.data(sampleData)
			.enter().append("rect")
			.attr("class", function(d){
				return "rank_svm rect_" + d.id;
			})
			.attr("x", 0)
			.attr("y", function(d, i){
				return yScale(d.id);
			})
			.attr("width", function(d){
				return xScale_rank_svm(d.rank_svm_saw);
			})
			.attr("height", 10)
			.style("fill", function(d){
				return d.sex.split(" ").join("") === "male"? "blue": "red";
			});
	
		return component.update();
	};
		
	component.update = function() {
		
		var vcorhot = container.selectAll(".corhot")
				.data(data, function(d){return d.id;});
			
			vcorhot.exit().remove();

			vcorhot.enter().append("g")
				.attr("class", "corhot")
				.append("circle")
				.attr("cx", function(d){return d.x;})
				.attr("cy", function(d){return d.y;})
				.attr("r", function(d){return d.r})
				.style("fill", "blue");

			container.selectAll(".corhot circle")
				.attr("cx", function(d){return d.x;})
				.attr("cy", function(d){return d.y;})
				.attr("r", function(d){return d.r});

		return component;
	};
	
	///////////////////////////////////////////////////
	// Private Functions
	
	function private_function1() {
		
	};
	
	function private_function2() {
		
	};
	
	function private_function3() {
		
	};
	
	return component;
};

vis.component2 = function (){
	var comp = {};
	console.log("this one");
	return comp;
}