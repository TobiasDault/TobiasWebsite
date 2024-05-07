var svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .style("border", "1px dashed");
var points;
d3.select("body").insert("div", "svg").append("button").text("Reset").on("click", reset);
// d3.select("body").insert("div", "svg").append("button").text("Undo").on("click", undo);
d3.select("body").insert("div", "svg").append("button").text("10 Random Points").on("click", randomPoints);

function exportGraph() {
    var cxcy = [];
    d3.selectAll("circle").each(function () {
        cxcy.push([d3.select(this).attr("cx"), d3.select(this).attr("cy")]);
    });
    points = cxcy;
}
function undo(){
    if(count !== 0){
        svg.select("circle").remove();
        svg.select("text").remove();
        count--;
        document.getElementById("pointsCount").innerHTML = "Points: " + count;
    }
}
function randomPoints(){
    for(let i = 0; i < 10; i++){
        flag = true;
        svgClick([Math.random() * 500, Math.random() * 500]);
    }
}
function randomPointsCustom(){
    let n = parseInt(document.getElementById("numPoints").value);
    for(let i = 0; i < n; i++){
        flag = true;
        svgClick([Math.random() * 500, Math.random() * 500]);
    }
}
var flag;
var running;
function runStatus(){
    return running;
}
function reset() {
    running = false;
    d3.selectAll("circle").remove();
    d3.selectAll("text").remove();
    d3.selectAll("line").remove();
    count = 0;
    document.getElementById("pointsCount").innerHTML = "Points: " + count;
    document.getElementById("path").innerHTML = "Path: ";
    document.getElementById("distance").innerHTML = "Total Distance: ";
    points = [];
}
svg.on("click", svgClick);
var prevClickLoc = [0,0];
var count = 0;
// document.getElementById("clicks").innerHTML = count;
function svgClick(temp) {
    var coords, x, y;
    if(!flag){
        d3.event.stopPropagation();
        coords = d3.mouse(this);
        x = coords[0];
        y = coords[1];
    }else{
        coords = temp
        x = coords[0];
        y = coords[1];
    }

    if (x !== prevClickLoc[0] && y !== prevClickLoc[1]){
        svg.append("circle").attr("r", 3)
            .attr("cx", x.toFixed(2))
            .attr("cy", y.toFixed(2))
            .style("fill", "blue")
            .style("stroke", "black")
            .style("stroke-width", "2px");

        svg.append("text")
            .style("fill", "black")
            .style("font-size", "14px")
            .attr("dy", ".35em")
            .attr("x", x+10)
            .attr("y", y-10)
            .style("style", "label")
            .text(count+1);

        prevClickLoc = coords;
        count++;
        document.getElementById("pointsCount").innerHTML = "Points: " + count;
        exportGraph();
        flag = false;
    }
}
function makeArrow(a, b, color){
    svg.append("line")
        .attr("x1",a[0])
        .attr("y1",a[1])
        .attr("x2",a[0])
        .attr("y2",a[1])
        .attr("stroke",color)
        .attr("stroke-width",2)
        .attr("marker-end","url(#arrow)")
        .transition()
        .duration(900)
        .attr("x2", b[0])
        .attr("y2", b[1]);
}
function makeLine(a, b, color, width){
    svg.append("line")
        .attr("x1",a[0])
        .attr("y1",a[1])
        .attr("x2",a[0])
        .attr("y2",a[1])
        .attr("stroke",color)
        .attr("stroke-width",width)
        .transition()
        .duration(100)
        .attr("x2", b[0])
        .attr("y2", b[1]);
    running = true;
}
function makeCircle(a, color, r){
    svg.append("circle").attr("r", r)
        .attr("cx", a[0])
        .attr("cy", a[1])
        .style("fill", color)
        .style("stroke", "black")
        .style("stroke-width", "2px");
}