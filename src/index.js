// import {select, json, geoPath, geoMercator, tsv, zoom, event} from 'd3';
// import { feature } from 'topojson';


const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const projection = d3.geoMercator();
const pathGenerator = d3.geoPath().projection(projection);

const g = svg.append('g');


// zoom
svg.call(d3.zoom()
      .on("zoom", zoomed));

function zoomed({transform}) {
g.attr("transform", transform);
}


// generate map and 光标停留时有country name
Promise.all([
    d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
]).then(([tsvData, topoJSONdata]) => {
    const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
    const countryName = {};
    tsvData.forEach(ele => {
        countryName[ele.iso_n3] = ele.name;   //id is 'iso3', title is 'name'
    });

    g.selectAll('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('class','country')
    .attr('d', d => pathGenerator(d))
    .append('title')
       .text(ele => countryName[ele.id]);
});

