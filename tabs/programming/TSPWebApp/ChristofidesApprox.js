async function christofides(points){
    d3.selectAll("line").remove();
    if(typeof points === 'undefined' || points === null || points.length === 0){
        return
    }
    path = [];
    const map = new Map();

    for(let i = 0; i < points.length; i++){
        map.set(i, points[i]);
    }
    const graph = createGraph(points);

    for(let i = 0; i < graph.size; i++){
        for(let j = 0; j < graph.size; j++){
            makeLine(points[i], points[j], "red", 1);
        }
    }
    let mst = prims(graph);
    for(let i = 0; i < mst.length; i++){
        if(runStatus() === false){
            break;
        }
        makeLine(map.get(mst[i][0]), map.get(mst[i][1]), "green", 3);
        await sleep(500);
    }
    await sleep(2000)
    let str = "";
    let odd = [];
    let oddPoints = [];
    for(let i = 0; i < mst.length; i++){
        str += mst[i][0];
        str += mst[i][1];
    }
    for(let i = 0; i < points.length; i++){
        if((str.split(i.toString()).length - 1) % 2 === 1){
            odd.push(i);
            oddPoints.push(map.get(i));
        }
    }
    const oddGraph = createGraph(oddPoints)
    for(let i = 0; i < odd.length; i++){
        makeCircle(map.get(odd[i]), "blue", 5)
    }
    await sleep(2000);
    const matchTree = minimumWeightMatching(mst, graph, odd);
    d3.selectAll("line").remove();
    for(let i = 0; i < mst.length; i++){
        if(runStatus() === false){
            break;
        }
        makeLine(map.get(matchTree[i][0]), map.get(matchTree[i][1]), "green", 3);
        await sleep(500);
    }
    await sleep(2000)
    adj = Array.from(Array(points.length).fill(0), () => new Array(points.length).fill(0))
    for(let i = 0; i < mst.length; i++){ //building adjacency matrix inside adj
        addEdge(mst[i][0], mst[i][1]) // 0 & 1 represent parent and child respectively
    }
    let visited = new Array(points.length).fill(false);
    dfs(0,visited);
    path.push(1);
    d3.selectAll("line").remove(); //remove any lines made by other functions before printing more
    let distance = 0.0;

    for(let i = 0; i < path.length-1; i++){
        distance += Math.sqrt(squaredDistance(map.get(path[i]-1), map.get(path[i+1]-1)));
    }

    document.getElementById("path").innerHTML = "Path: " + path;
    document.getElementById("distance").innerHTML = "Total Distance: " + distance.toFixed(2);

    for(let i = 0; i < path.length-1; i++){ //send arrows to UI
        if(runStatus() === false){
            break;
        }
        makeArrow(map.get(path[i]-1), map.get(path[i+1]-1), "blue");
        await sleep(900);
    }

}

function minimumWeightMatching(mst, graph, odd){

    shuffle(odd);

    while(odd.length !== 0){
        let v = odd.pop();

        let length = Number.MAX_VALUE;
        let u = 1;
        let closest = 0;
        for(let i = 0; i < odd.length; i++){
            if(v !== u && graph.get(v)[odd[i]][1] < length){
                length = graph.get(v)[odd[i]][1];
                closest = odd[i];
            }
        }
        mst.push([v,parseInt(closest)]);
        odd.slice(closest);
    }
    return mst;
}
