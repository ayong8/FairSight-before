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
		
		container
			.attr("width", "800px")
			.attr("height", "700px")

		var g_title = container.append("g")
					.attr("transform", "translate(10, 50)"),
			g_name = container.append("g")
					.attr("transform", "translate(10, 50)"),
			g_total_score = container.append("g")
					.attr("transform", "translate(30, 50)"),
			g_attr1 = container.append("g")
					.attr("transform", "translate(170, 40)"),
			g_attr2 = container.append("g")
					.attr("transform", "translate(240, 40)"),
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
			.attr("x", 160)
			.attr("y", 0)
			.text("Cred_a");
		g_title.append("text")
			.attr("x", 230)
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

vis.component2 = function() {
	var component = {},
		container = null,
		data = null,
		size = [960, 800],
	 	margin = {left:10, top:10, right:10, bottom:10},
		dispatch = d3.dispatch("select", "mouseover", "mouseout");

	component.container = function(_) {
		console.log("inside component2 container");
		if (!arguments.length) 
			return container;
		container = _;

		return component;
	};

	component.data = function(_) {
		if (!arguments.length) return data;

		data = _;
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
		
		container
			.attr("width", "800px")
			.attr("height", "700px")

		var xScale_total_score = d3.scaleLinear()
								.range([5, 50])
								.domain(d3.extent(sampleData, function(d){ return d.credit_amount; })),
			xScale_attr1 = d3.scaleLinear()
								.range([350, 0])
								.domain(d3.extent(sampleData, function(d){ return +d.credit_amount; })),
			xScale_attr2 = d3.scaleLinear()
								.range([0, 400])
								.domain(d3.extent(sampleData, function(d){ return +d.age; }));

			circleScale = d3.scaleLinear()
				.range([5, 20])
				.domain(d3.extent(sampleData, function(d){ return d.credit_amount; }));

		var gChart = container.append("g")
				.attr("class", "g_chart")
				.attr("transform", "translate(0,10)");

		var xAxis = d3.axisBottom(xScale_attr2);
		var yAxis = d3.axisLeft(xScale_attr1);

		var gCircle = container.append("g")
				.attr("class", "g_chart")
				.attr("transform", "translate(60,410)");

		gChart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(40,350)")
			.call(xAxis);

		gChart.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(40,0)")
			.call(yAxis);

		container.append("text")
			.attr("x", 0)
			.attr("y", 410)
			.text("Ranking 1");

		gChart.selectAll("circle")
			.data(sampleData)
			.enter().append("circle")
			.attr("class", "circle")
			.attr("cx", function(d){
				return xScale_attr2(+d.age)+40;
			})
			.attr("cy", function(d){
				return xScale_attr1(+d.credit_amount);
			})
			.attr("r", function(d){
				return circleScale(+d.credit_amount);
			})
			.style("fill", "mediumpurple")
			.style("fill-opacity", 0.6);

		gCircle.selectAll("circle")
			.data(sampleData)
			.enter().append("circle")
			.attr("class", "circle")
			.attr("cx", function(d){
				return xScale_attr1(+d.credit_amount)+40;
			})
			.attr("cy", function(d){
				return 0;
			})
			.attr("r", function(d){
				return circleScale(+d.credit_amount);
			})
			.style("fill", "mediumpurple")
			.style("fill-opacity", 0.6);
	
		return component.update();
	};
		
	component.update = function() {
		

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

vis.component3 = function() {
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
		var _self = this;
	
		if(!container) {
			return;
		}
		var sampleData = data.slice(0, 10);
		sampleData = sampleData.sort(function(a, b){ return d3.descending(a.rank_svm_saw, b.rank_svm_saw); });
		
		container
			.attr("width", "800px")
			.attr("height", "700px")
			.attr("class", "component3");

		var g_title = container.append("g")
					.attr("transform", "translate(10, 50)"),
			g_name = container.append("g")
					.attr("transform", "translate(10, 50)"),
			g_total_score = container.append("g")
					.attr("transform", "translate(30, 50)"),
			g_attr1 = container.append("g")
					.attr("transform", "translate(170, 40)"),
			g_attr2 = container.append("g")
					.attr("transform", "translate(240, 40)"),
			g_rank_svm = container.append("g")
					.attr("transform", "translate(40, 40)");

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
								.range([10, 100])
								.domain(d3.extent(sampleData, function(d){ return +d.rank_svm_saw; })),
			yScale = d3.scaleBand()
					.rangeRound([20, size[1]-50])
					.domain(sampleData.map(function(d){ return d.id; }));

		g_title.append("text")
			.attr("x", 0)
			.attr("y", 0)
			.text("#");
		g_title.append("text")
			.attr("x", 30)
			.attr("y", 0)
			.text("Aggregated ranking");
	
		g_name.selectAll(".ranking_id")
			.data([1,2,3,4,5,6,7,8,9,10])
			.enter().append("text")
			.attr("class", "ranking_id")
			.attr("x", 0)
			.attr("y", function(d, i){
				return d*50-20;
			})
			.style("font-size", "15px")
			.text(function(d, i){ return d; });
		
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
			.attr("height", 30)
			.style("fill", "orange");
	
		return component.update();
	};
		
	component.update = function() {
		

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