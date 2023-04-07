// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Get JSON data and and log it to console
d3.json(url).then(function(data) {
  console.log(data);
});


//Plot bar graph and bubble chart
function Plot(id) {
    d3.json(url).then(function (data) {
        let uniqueId = data.samples.filter(sample => sample.id === id)[0];
        let OTUvalues = uniqueId.sample_values.slice(0, 10).reverse();
        let OTUids = uniqueId.otu_ids.slice(0, 10).reverse();
        let labels = uniqueId.otu_labels.slice(0, 10).reverse();
        let barTrace = [{
            x: OTUvalues,
            y: OTUids.map(object => 'OTU ' + object),
            name: labels,
            type: 'bar',
            orientation: 'h'
        }];
        let barLayout = {
            title: `Top OTUs for Subject ${id}`,
        };
        Plotly.newPlot('bar', barTrace, barLayout);

        let bubbleTrace = [{
            x: uniqueId.otu_ids,
            y: uniqueId.sample_values,
            marker: {
                size: uniqueId.sample_values,
                color: uniqueId.otu_ids,
                colorscale: 'Tealrose'
            },
            mode: 'markers',
            text: uniqueId.otu_labels,
        }];
        let bubbleLayout = {
            title: `OTUs for Subject ${id}`,
        };
        Plotly.newPlot('bubble', bubbleTrace, bubbleLayout);
    })
};


//Dropdown creation
function init() {
    let dropDown = d3.select('#selDataset');
    let selector = dropDown.property('value');
    d3.json(url).then(function (data) {
        let names = data.names;
        Object.values(names).forEach(value => {dropDown.append('option').text(value);
        })
        Plot(names[0])
    })
};

function optionChanged(subjectId) {
    Plot(subjectId);
};

init();

