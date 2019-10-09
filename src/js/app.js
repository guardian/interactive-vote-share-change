import * as d3 from 'd3'
import config from './../../config.json'

console.log(config)
const dataurl = config.docData;



d3.json(dataurl).then(data => {

    var containerWidth = Number(d3.select(".interactive-wrapper").style('width').slice(0, -2))

    var chart = d3.select(".gv-chart-graphic")

    var svg = chart.append("svg")
    .attr("width", containerWidth)
    .attr("height", 400)
    .attr("class","gv-waffle")
    .attr("id","gv-waffle")

    var results = data.sheets.results;

    var allshares = []
    results.map(p => {
        allshares.push(p.share);
        allshares.push(p.previous);
    } )
    allshares.sort((a,b) => {
        return b - a;
    })
    var largestShare = allshares[0];

    var prevs = svg.append("g").selectAll("prev-bar")
    .data(results)
    .enter()
    .append('rect')
    .attr("width", d => {
        return ((d.previous / largestShare) * containerWidth) - 150;
    })
    .attr("height", "20px")
    .attr("fill", "grey")
    .attr("y", (d,i) => {return (i * 35)  + 10})
    .attr("x", 150)


    var currents = svg.append("g").selectAll("current-bar")
    .data(results)
    .enter()
    .append('rect')
    .attr("width", d => {
        return ((d.share / largestShare) * containerWidth) - 150;
    })
    .attr("height", "20px")
    .attr("fill", d => d.partycolour)
    .attr("y", (d,i) => {return i * 35})
    .attr("x", 150)


    var partylabels = svg.append("g").selectAll("partylabel")
    .data(results)
    .enter()
    .append("text")
    .attr("y", (d,i) => {return (i * 35) + 20})
    .text(d => d.party)

    var sharelabels = svg.append("g").selectAll("sharelabel")
    .data(results)
    .enter()
    .append("text")
    .attr("y", (d,i) => {return (i * 35) + 35})
    .text(d => `${d.share}% (${d.previous - d.share})`)







    // var partycurrent = svg.append("g").selectAll("pblob")
    //     .data(partyarray)
    //     .enter()
    //     .append('rect')
    //     .attr("id", (d, i) => { return i })
    //     .attr("x", (d, i) => {
    //         return cellsize * Math.floor(i / ranks)
    //     })
    //     .attr("y", (d, i) => {
    //         return i * cellsize - (Math.floor(i / ranks) * cellsize * ranks)
    //     })
    //     .attr("fill", d => d.colour)
    //     .attr("height", cellsize - 2)
    //     .attr("width", cellsize - 2)


    window.resize()

})



