/*
	A code template for a visualization component
	Author : Nan Cao (nancao.org)
*/

vis.ranking = function() {
	var ranking = {},
		container = null,
		data = null,
		size = [960, 800],
	 	margin = {left:10, top:10, right:10, bottom:10},
		dispatch = d3.dispatch("select", "mouseover", "mouseout");

	ranking.container = function(_) {
		if (!arguments.length) return container;
		container = _;

		return ranking;
	};

	ranking.data = function(_) {
		if (!arguments.length) return data;

		data = _;
		return ranking;
	};

	ranking.size = function(_) {
		if (!arguments.length) return size;
		size = _;
		return ranking;
	};

	ranking.margin = function(_) {
		if (!arguments.length) return margin;
		margin = _;
		return ranking;
	};

	ranking.dispatch = dispatch;

	///////////////////////////////////////////////////
	// Private Parameters
    
	///////////////////////////////////////////////////
	// Public Function
	ranking.layout = function() {
		
		return ranking;
	};

	ranking.render = function() {
		if(!container) {
			return;
		}
        var sampleData = data.slice(0, 10),
            sampleData2 = data.slice(0, 10);

        sampleData2.forEach(function(data){
            data.rank_svm_saw = 1 + Math.random([0, 1]);
        })
        
        sampleData = sampleData.sort(function(a, b){ return d3.descending(a.rank_svm_saw, b.rank_svm_saw); });
        sampleData2 = sampleData.sort(function(a, b){ return d3.descending(a.rank_svm_saw, b.rank_svm_saw); });
        
        var rectComponentScale = d3.scaleLinear()
                .range([10, 30])
                .domain([1, 2]);

        var gRanking = container.append("g")
                        .attr("class", "ranking-instance")
                        .attr("transform", "translate(50,20)");
            gRanking2 = container.append("g")
                        .attr("class", "ranking-instance")
                        .attr("transform", "translate(280,20)");
        
        gRanking.selectAll(".rect_component")
            .data(sampleData)
            .enter().append("rect")
            .attr("class", function(d, i){
                return "rect_component_" + i;
            })
            .attr("x", 0)
            .attr("y", function(d, i){
                var stackedData = sampleData.map(function(d){ return rectComponentScale(d.rank_svm_saw); }).slice(0, i);
                return i === 0? 0 : stackedData.reduce(function(a, b){
                    return a + b; 
                });
            })
            .attr("width", 50)
            .attr("height", 50)
            .style("fill", function(d){
                return d.sex === "female"? "red" : "blue";
            })
            .style("stroke", "white")
            .style("stroke-width", 1);

        gRanking2.selectAll(".rect_component")
            .data(sampleData2)
            .enter().append("rect")
            .attr("class", function(d, i){
                return "rect_component_" + i;
            })
            .attr("x", 0)
            .attr("y", function(d, i){
                var stackedData = sampleData2.map(function(d){ return rectComponentScale(d.rank_svm_saw); }).slice(0, i);
                return i === 0? 0 : stackedData.reduce(function(a, b){
                    return a + b; 
                });
            })
            .attr("width", 50)
            .attr("height", function(d){
                return rectComponentScale(d.rank_svm_saw);
            })
            .style("fill", function(d){
                return d.sex === "female"? "red" : "blue";
            })
            .style("stroke", "white")
            .style("stroke-width", 1);
	
		return ranking.update();
	};
		
	ranking.update = function() {
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

		return ranking;
	};
	
	///////////////////////////////////////////////////
	// Private Functions
	
	function private_function1() {
		
	};
	
	function private_function2() {
		
	};
	
	function private_function3() {
		
	};
	
	return ranking;
};