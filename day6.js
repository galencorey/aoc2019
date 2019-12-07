const fs = require("fs");
const rawInput = fs.readFileSync('./day6Input.txt', 'utf8');
const input = rawInput.split('\n'); 
function parseLine(line) {
    return line.split(')'); 
}

function createOrbitGraph(input) {
    const orbitGraph = {}
    for (let line of input) {
        const [orbited, orbiter] = parseLine(line); 
        if (orbitGraph.hasOwnProperty(orbited)) {
            orbitGraph[orbited].push(orbiter)
        } else {
            orbitGraph[orbited] = [orbiter]; 
        }
    }
    return orbitGraph
}

function createReverseOrbitGraph(input) {
    const orbitGraph = {}
    for (let line of input) {
        const [orbited, orbiter] = parseLine(line); 
        orbitGraph[orbiter] = orbited; 
    }
    return orbitGraph
}

function countOrbits(input) {
    const orbitGraph = createOrbitGraph(input)
    console.log(orbitGraph)
    // perform a dfs of orbit graph 
    // for each orbitee in the graph, num added orbits is equal to orbit depth in graph  
    const visited = new Set(); 
    const leftToCount = []; 
    let curr = {name: 'COM', orbitDepth: 0}; 
    let totalNumOrbits = 0; 

    while (curr) {
        // make sure we do not double count 
        if (!visited.has(curr.name)) {
            // add orbits to accumulator  
            totalNumOrbits += curr.orbitDepth; 
            // add orbiters to the stack 
            if (orbitGraph[curr.name]) {
                for (let orbiter of orbitGraph[curr.name]) {
                    leftToCount.push({name: orbiter, orbitDepth: curr.orbitDepth + 1})
                }
            }
            // mark as visited 
            visited.add(curr.name)
        }
        // move on to the next orbitee
        curr = leftToCount.pop(); 
    }

    return totalNumOrbits; 
}


function getnumStepsetweenNodes(A, B, graph) {
    // this time, we are using a reverse graph where children map to parents 
    // at every step, we will compare the parents against each other, and 
    // then store the node in a map of seen parents. As soon as we find a 
    // common parent, we will return the distance to each. 
    const parentsA = new Map(); 
    const parentsB = new Map(); 


    let currA = graph[A]; 
    let currB = graph[B]; 
    let numSteps = 0; 

    while (currA || currB) {
        if (currA && currB && currA === currB) {
            return numSteps + numSteps; 
        }
        if (currB && parentsA.has(currB)) {
            return numSteps + parentsA.get(currB)
        }
        if (currA && parentsB.has(currA)) {
            return numSteps + parentsB.get(currA)
        }
        if (currA) {
            parentsA.set(currA, numSteps); 
            currA = graph[currA]; 
        }
        if (currB) {
            parentsB.set(currB, numSteps); 
            currB = graph[currB]; 
        }

        numSteps ++; 
    }
    throw new Error('never found a path')

}

// part 1
console.log(countOrbits(input))
// part 2
console.log(getnumStepsetweenNodes('YOU', 'SAN', createReverseOrbitGraph(input)))