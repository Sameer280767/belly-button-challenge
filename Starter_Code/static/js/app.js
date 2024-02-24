// The url points to a JSON file hosted on Amazon S3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// I have declared a variable 'data' without assigning any value to it
// I plan to fetch the JSON data from url and assign it to 'data' variable
let data;

// Lets define a function to initialize the web page
function init() {
    // I will now initiate a request to fetch JSON data from the url and assign JSON data to variable 'data'
    // I will then log it to the console
    d3.json(url).then((jsonDatadata) => {
        data = jsonDatadata;
        console.log(data);
        
        // Here I will iterate over the 'names' property of the 'data' object
        // The code populates the dropdown menu with options, namely the 'names' retrieved from the 'data' object
        let dropdown = d3.select("#selDataset");
        data.names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });

        // I will now define 4 functions which will buid a bar/ bubble and gauge chart and display metadata
        let firstSample = data.names[0];
        buildPlots(firstSample);
        buildBubbleChart(firstSample);
        displaySampleMetadata(firstSample);
        buildGaugeChart(firstSample);
    });
}

 // Function to build plots is based on following logic
 // Filter the data for selected sample id
 // Sort the 'sample_values' in descending order
 // Extract the top 10 sample_values, corresponding otu_ids, and otu_labels
function buildPlots(sample) {
    let selectedSample = data.samples.filter((s) => s.id === sample)[0];

    selectedSample.sample_values.sort((a, b) => b - a);

    let top10SampleValues = selectedSample.sample_values.slice(0, 10).reverse();
    let top10OTUIds = selectedSample.otu_ids.slice(0, 10).reverse();
    let top10OTULabels = selectedSample.otu_labels.slice(0, 10).reverse();

    // We now build the horizontal bar chart
    let trace = {
        x: top10SampleValues,
        y: top10OTUIds.map((id) => `OTU ${id}`),
        text: top10OTULabels,
        type: "bar",
        orientation: "h"
    };

    let plotData = [trace];

    let layout = {
        title: `Top 10 OTUs for Sample ${sample}`,
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
    };

    Plotly.newPlot("bar", plotData, layout);
}

// Function to build bubble charts is based on following logic
// Filter the data for selected sample id
// Extract the otu_ids, sample_values, and otu_labels from the selected sample
// Set the marker size based on the sample_values, marker color based on the otu_ids, and use the 'Earth' colorscale
function buildBubbleChart(sample) {
    let selectedSample = data.samples.filter((s) => s.id === sample)[0];
    let otuIds = selectedSample.otu_ids;
    let sampleValues = selectedSample.sample_values;
    let otuLabels = selectedSample.otu_labels;
    let trace = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampleValues,  
            color: otuIds,       
            colorscale: 'Earth'  
        }
    };
    var plotData = [trace];
    var layout = {
        title: `Bubble Chart for Sample ${sample}`,
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
    };
    Plotly.newPlot("bubble", plotData, layout);
}

// Function to display metadata is based on following logic
// Filter the metadata from the 'data' object based on the selected sample ID
// Select the HTML element '#sample-metadata' to display the metadata
// Clear any existing metadata
// Loop through each property of the metadata object using Object.entries(metadata)
// For each key-value pair in the metadata, append a <p> element to the metadataPanel with the format "key: value"
function displaySampleMetadata(sample) {
    let metadata = data.metadata.filter((m) => m.id == sample)[0];    
    let metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
    });
}

// Function to display Gauge chart is based on following logic
// Filters the metadata from the 'data' object based on the selected sample ID to retrieve the washing frequency (wfreq)
// Create the plot data for the gauge chart, specifying the domain, value (washing frequency), title, type, and mode
// Defines the layout for the gauge chart, setting the width, height, and margin
// Use Plotly to create the gauge chart with the specified data and layout, and place the plot in the HTML element with the id "gauge"
function buildGaugeChart(sample) {
    let selectedMetadata = data.metadata.filter((m) => m.id == sample)[0];
    let wfreq = selectedMetadata.wfreq;
    let plotData = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 9] }, // Set the range from 0 to 9
                steps: [
                    { range: [0, 1], color: "lightgray" },
                    { range: [1, 2], color: "lightyellow" },
                    { range: [2, 3], color: "lightgreen" },
                    { range: [3, 4], color: "yellow" },
                    { range: [4, 5], color: "green" },
                    { range: [5, 6], color: "lightblue" },
                    { range: [6, 7], color: "blue" },
                    { range: [7, 8], color: "lightpurple" },
                    { range: [8, 9], color: "purple" }
            ]}}];
    let layout = {
        width: 400,
        height: 300,
        margin: { t: 0, b: 0 },
    };

    Plotly.newPlot("gauge", plotData, layout);
}

// Function below serves as the handler for changing the selected sample in the dropdown menu
// This triggers the update of all relevant visualizations and metadata
function optionChanged(sample) {
    buildPlots(sample);
    buildBubbleChart(sample);
    displaySampleMetadata(sample);
    buildGaugeChart(sample);
}

init();