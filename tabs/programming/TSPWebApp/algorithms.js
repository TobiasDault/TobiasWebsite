function addEdge(x, y)
{
    adj[x][y] = 1;
    adj[y][x] = 1;
}
function dfs(start, visited){
    path.push(start+1);
    visited[start] = true;

    for(let i = 0; i < adj[start].length; i++){
        if(adj[start][i] === 1 && !visited[i])
            dfs(i, visited);
    }
}
function prims(graph){
    let x, y;
    let edges = 0;
    let selected = new Array(points.length).fill(false);
    selected[0] = true;
    let mst = [];
    while(edges < points.length - 1){
        let min = Number.MAX_VALUE; //or I guess it could be 500000 since the window is 500 x 500
        x = 0;
        y = 0;
        for(let i = 0; i < points.length; i++){
            if(selected[i]){
                for(let j = 0; j < points.length; j++){
                    let current = parseInt(graph.get(i)[j][1]);
                    if(!selected[j] && current !== 0){
                        if(current < min){
                            min = current;
                            x = i;
                            y = j;
                        }
                    }
                }
            }
        }
        mst.push([x,y]);
        selected[y] = true;
        edges++;
    }
    return mst;
}
function createGraph(points){
    const graph = new Map();
    for(let i = 0; i < points.length; i++){
        let temp = [];
        for(let j = 0; j < points.length; j++){
            if(i !== j){
                temp.push([j, squaredDistance(points[i], points[j]).toFixed(0)]);
            }else{
                temp.push([j,0]);
            }
        }
        graph.set(i, temp);
    }
    return graph;
}
function squaredDistance(a, b){
    return (b[0] - a[0])**2 + (b[1] - a[1])**2
}
function closestPoint(current, points, visited) {
    let min = Number.MAX_VALUE;
    let closest = [];
    for (let i = 0; i < points.length; i++) {
        if (squaredDistance(current, points[i]) < min && squaredDistance(current, points[i]) !== 0 && !visited[i]) {
            min = squaredDistance(current, points[i]);
            closest = points[i];
        }
    }
    return closest;
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}