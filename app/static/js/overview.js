/*
	A code template for a visualization component
	Author : Nan Cao (nancao.org)
*/

vis.overview = function() {
	var overview = {},
		container = null,
		data = null,
		size = [960, 800],
	 	margin = {left:10, top:10, right:10, bottom:10},
		dispatch = d3.dispatch("select", "mouseover", "mouseout");

	overview.container = function(_) {
        console.log("inside overview container");
        if (!arguments.length) 
            return container;
        container = _;
        
        container
			.attr("width", 400)
			.attr("height", 300)
			.attr("class", "svg_overview")

		return overview;
	};

	overview.data = function(_) {
		if (!arguments.length) return data;

		data = _;
		return overview;
	};

	overview.size = function(_) {
		if (!arguments.length) return size;
		size = _;
		return overview;
	};

	overview.margin = function(_) {
		if (!arguments.length) return margin;
		margin = _;
		return overview;
	};

	overview.dispatch = dispatch;

	///////////////////////////////////////////////////
	// Private Parameters
    
	///////////////////////////////////////////////////
	// Public Function
	overview.layout = function() {
		
		return overview;
	};

	overview.render = function() {
        console.log("inside overview render");
		if(!container) {
			return;
		}
		var sampleData = data.slice(0, 10);
        sampleData = sampleData.sort(function(a, b){ return d3.descending(a.rank_svm_saw, b.rank_svm_saw); });
        
        var rankingInstance = vis.ranking().data(sampleData).container(this.container()).render();
	
		return overview.update();
	};
		
	overview.update = function() {
		
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

		return overview;
	};
	
	///////////////////////////////////////////////////
	// Private Functions
	
	function private_function1() {
		
	};
	
	function private_function2() {
		
	};
	
	function private_function3() {
		
	};
	
	return overview;
};