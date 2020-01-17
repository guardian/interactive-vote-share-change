import * as d3fetch from 'd3-fetch'
import * as d3selection from 'd3-selection'
import config from './../../config.json'
import nodefetch from 'node-fetch'

console.log('making')
const fetch = nodefetch;
console.log('')

const d3 = Object.assign({}, d3fetch, d3selection);

const dataurl = config.docData;


console.log("vote share running boojum")


export default function make (context) {

    function getFurniture(data) {
        var furniture = data.sheets.furniture;
        furniture.map(f => {
            if (document.querySelector(f.element) !== null) {
                var el = document.querySelector(f.element)
                el.innerHTML = f.text;
            }
        })
    }

    d3.json(dataurl).then(data => {

        var containerWidth = Number(d3.select(".interactive-wrapper").style('width').slice(0, -2))
    
        var chartwidth = containerWidth - 150
    
        var chart = d3.select(".gv-chart-graphic")
    
        var results = data.sheets.results;
    
        console.log(results)
    
        var svg = chart.append("svg")
        .attr("width", containerWidth)
        .attr("height", (45 * results.length))
        .attr("class","gv-waffle")
        .attr("id","gv-waffle")
    
    
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
            return ((d.previous / largestShare) * chartwidth);
        })
        .attr("height", "20px")
        .attr("fill", d => d.partycolour)
        .attr("y", (d,i) => {return (i * 45)  + 20})
        .attr("x", 150)
        .attr("opacity",0.25)
    
    
        var currents = svg.append("g").selectAll("current-bar")
        .data(results)
        .enter()
        .append('rect')
        .attr("width", d => {
            return ((d.share / largestShare) * chartwidth);
        })
        .attr("height", "20px")
        .attr("fill", d => d.partycolour)
        .attr("y", (d,i) => {return i * 45})
        .attr("x", 150)
    
    
        var partylabels = svg.append("g").selectAll("partylabel")
        .data(results)
        .enter()
        .append("text")
        .attr("y", (d,i) => {return (i * 45) + 15})
        .text(d => d.party)
        .attr("class","gv-party-name")
    
        var sharelabels = svg.append("g").selectAll("sharelabel")
        .data(results)
        .enter()
        .append("text")
        .attr("y", (d,i) => {return (i * 45) + 35})
        .text(d => `${d.share}% (${d.share > d.previous ? "+": ""}${(d.share - d.previous).toFixed(1)})`)
        .attr("class","gv-party-result")
    
        var currentyear = svg.append("g");
        currentyear.append("text")
        .text("2019")
        .attr("class","gv-current-year")
        .attr("x", 152)
        .attr("y", 18)
    
    
    
        var previousyear = svg.append("g");
        previousyear.append("text")
        .text("2015")
        .attr("class","gv-previous-year")
        .attr("x", 152)
        .attr("y", 38)
    
    
    
    
    
    
    
    
    
    
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
    
    
        getFurniture(data);
    
    
        const doResize = () => {
    
            if(window.resize) {
                window.resize()
            }
          
            window.parent.postMessage({
                sentinel: 'amp',
                type: 'embed-size',
                height: document.body.scrollHeight
              }, '*')
          }
          
          try {
            doResize()
          } catch(err) { console.log("Resize error", err) }
          
          document.body.addEventListener('load', () => {
          
              try {
                  doResize()
              } catch(err) { console.log("Resize onLoad error", err) }
          
          })
    })
    
    
    
    
    


}

