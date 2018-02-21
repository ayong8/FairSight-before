var svg = d3.select("#plot")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

var view = {
    layout: {
        w: 800,
        h: 850
    }
}

var dataset = {
    rawData: [],
    getData: function() {
    }
}

d3.csv("german_credit_sample.csv", function(data){
    dataset.rawData = data;
    console.log(data);

    var sampleData = data.slice(0, 40);
    sampleData = sampleData.sort(function(a, b){ return d3.descending(a.rank_svm_saw, b.rank_svm_saw); });

    var g_title = svg.append("g")
                .attr("transform", "translate(10, 50)"),
        g_name = svg.append("g")
                .attr("transform", "translate(10, 50)"),
        g_total_score = svg.append("g")
                .attr("transform", "translate(30, 50)"),
        g_attr1 = svg.append("g")
                .attr("transform", "translate(150, 40)"),
        g_attr2 = svg.append("g")
                .attr("transform", "translate(200, 40)"),
        g_rank_svm = svg.append("g")
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
                .rangeRound([20, view.layout.h-50])
                .domain(sampleData.map(function(d){ return d.id; }));
        
        console.log(yScale.domain());
        console.log(sampleData.map(function(d){ return d.id; }));

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
});