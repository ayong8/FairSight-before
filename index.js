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

d3.csv("german_credit.csv", function(data){
    dataset.rawData = data;
    console.log(data);

    var sampleData = data.slice(0, 50);

    var g_title = svg.append("g")
                .attr("transform", "translate(10, 50)"),
        g_name = svg.append("g")
                .attr("transform", "translate(10, 50)"),
        g_total_score = svg.append("g")
                .attr("transform", "translate(30, 40)"),
        g_attr1 = svg.append("g")
                .attr("transform", "translate(150, 40)"),
        g_attr2 = svg.append("g")
                .attr("transform", "translate(200, 40)")
    
    var xScale_total_score = d3.scaleLinear()
                            .range([5, 50])
                            .domain(d3.extent(sampleData, function(d){ return d.credit_amount; })),
        xScale_attr1 = d3.scaleLinear()
                            .range([10, 40])
                            .domain(d3.extent(sampleData, function(d){ return +d.duration_in_month; })),
        yScale = d3.scaleBand()
                .rangeRound([0, view.layout.h-50])
                .domain(d3.range(0, sampleData.length+3));
    console.log("duration_month_range", d3.extent(sampleData, function(d){ return +d.duration_in_month; }));
    console.log(yScale.domain());

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
        .text("attr1");
    g_title.append("text")
        .attr("x", 190)
        .attr("y", 0)
        .text("attr2");

    g_name.selectAll(".id")
        .data(sampleData)
        .enter().append("text")
        .attr("class", function(d, i){
            return "id id_" + d.id;
        })
        .attr("x", 0)
        .attr("y", function(d, i){
            console.log(d.id);
            return yScale(parseInt(d.id));
        })
        .style("font-size", "11px")
        .text(function(d, i){ return d.id; });
    
    g_total_score.selectAll(".total_score_rect")
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
            return xScale_total_score(d.credit_amount);
        })
        .attr("height", 10)
        .style("fill", function(d){
            console.log(d.sex);
            return d.sex.split(" ").join("") === "male"? "blue": "red";
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
            return xScale_attr1(d.duration_in_month);
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
            return yScale(parseInt(d.id));
        })
        .attr("width", function(d){
            return xScale_attr1(d.age);
        })
        .attr("height", 10)
        .style("fill", "moccasin");
});