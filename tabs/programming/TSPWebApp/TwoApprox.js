let adj;
var path;

async function twoApprox(points){
    d3.selectAll("line").remove();
    if(typeof points === 'undefined' || points === null || points.length === 0){
        return
    }
    path = [];
    const idsToPointsMap = new Map();
    for(let i = 0; i < points.length; i++){
        idsToPointsMap.set(i, points[i]);
    }

    const completeGraph = createGraph(points);

    for(let i = 0; i < completeGraph.size; i++){
        for(let j = 0; j < completeGraph.size; j++){
            makeLine(points[i], points[j], "red", 1);
        }
    }
    let mst = prims(completeGraph);
    for(let i = 0; i < mst.length; i++){
        if(runStatus() === false){
            break;
        }
        makeLine(idsToPointsMap.get(mst[i][0]), idsToPointsMap.get(mst[i][1]), "green", 3);
        await sleep(500);
    }
    await sleep(2000)

    adj = Array.from(Array(points.length).fill(0), () => new Array(points.length).fill(0)); //nxn array filled with zeros

    for(let i = 0; i < mst.length; i++){ //building adjacency matrix inside adj
        addEdge(mst[i][0], mst[i][1]) // 0 & 1 represent parent and child respectively
    }
    let visited = new Array(points.length).fill(false);

    dfs(0,visited); //result is stored in path (global variable)
    path.push(1);
    d3.selectAll("line").remove(); //remove any lines made by other functions before printing more
    let distance = 0.0;

    for(let i = 0; i < path.length-1; i++){
        distance += Math.sqrt(squaredDistance(idsToPointsMap.get(path[i]-1), idsToPointsMap.get(path[i+1]-1)));
    }

    document.getElementById("path").innerHTML = "Path: " + path;
    document.getElementById("distance").innerHTML = "Total Distance: " + distance.toFixed(2);

    for(let i = 0; i < path.length-1; i++){ //send arrows to UI
        if(runStatus() === false){
            break;
        }
        makeArrow(idsToPointsMap.get(path[i]-1), idsToPointsMap.get(path[i+1]-1), "blue");
        await sleep(900);
    }
}