
async function nearestNeighbor(points){
    d3.selectAll("line").remove();
    console.log(points);
    if(typeof points === 'undefined' || points === null || points.length === 0){
        return
    }
    const pointstoIdsMap = new Map();
    const idsToPointsMap = new Map();

    for(let i = 0; i < points.length; i++){
        pointstoIdsMap.set(points[i], i);
    }
    for(let i = 0; i < points.length; i++){
        idsToPointsMap.set(i, points[i]);
    }

    const pathIds = [];
    let visited = new Array(points.length).fill(false);
    pathIds.push(1)
    let i = 0;
    let last = points[0];
    let distance = 0.0;
    while(pathIds.length < points.length){ // O(n)
        console.log(runStatus())
        for(let j = 0; j < points.length; j++){
            if(pointstoIdsMap.get(points[j]) !== pointstoIdsMap.get(last)){
                makeLine(points[i], points[j], "red", 2);
                if(runStatus() === false){
                    break;
                }
                await sleep(100);
            }
        }
        visited[i] = true;
        let closest = closestPoint(points[i], points, visited); // O(n)
        distance += Math.sqrt(squaredDistance(points[i], closest));
        d3.selectAll("line").attr("stroke", "red").remove();
        makeLine(points[i], closest, "green", 2);
        pathIds.push(pointstoIdsMap.get(closest)+1);
        last = points[i];
        i = pointstoIdsMap.get(closest);
    }
    pathIds.push(1);

    d3.selectAll("line").remove();
    document.getElementById("path").innerHTML = "Path: " + pathIds
    document.getElementById("distance").innerHTML = "Total Distance: " + distance.toFixed(2);
    for(let i = 0; i < pathIds.length-1; i++){
        if(runStatus() === false){
            break;
        }
        makeArrow(idsToPointsMap.get(pathIds[i]-1), idsToPointsMap.get(pathIds[i+1]-1), "blue");
        await sleep(900);
    }
}