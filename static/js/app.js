function optionChanged(){
  // ##### GET THE SELECT OPTION VALUE #####
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  // When the value in the select box changes, then change the horizontal bar chart
  filteredSampleData = samples.filter(entry => entry.id === dataset)[0];
  

  // ##### HORIZONTAL BAR GRAPH #####
  // Select top 10 sample values
  let top_ten_sample_values = filteredSampleData.sample_values.slice(0, 10).reverse();
  let top_ten_sample_otu_ids = filteredSampleData.otu_ids.map(entry => 'OTU ' + entry).slice(0, 10).reverse();
  let top_ten_sample_otu_labels = filteredSampleData.otu_labels.slice(0, 10).reverse();
  // Create a trace object
  let bar_trace1 = {
    x: top_ten_sample_values,
    y: top_ten_sample_otu_ids,
    text: top_ten_sample_otu_labels,
    type: "bar",
    orientation: "h"
  };
  // Create a data array with the above trace
  let bar_data = [bar_trace1];
  // Create a layout
  bar_layout = {
    autosize: true
  }
  // Plot the chart
  Plotly.newPlot("bar", bar_data, bar_layout);


  // ##### DEMOGRAPHIC INFO (METADATA) #####
  // Filter the metadata by the selected option value
  filteredMetaData = metadata.filter(entry => entry.id === parseInt(dataset))[0];
  // Remove any previous metadata
  d3.selectAll("table").html("");
  // Add new metadata
  let tbody = d3.select("#sample-metadata").append("table");
  for (const [key, value] of Object.entries(filteredMetaData)) {
    let row = tbody.append("tr");
    let cell = row.append("td");
    cell.text(`${key}: ${value}`);
  };

  // ##### BUBBLE CHART #####
  // Creat the bubble chart trace
  var bubble_trace1 = {
      x: filteredSampleData.otu_ids,
      y: filteredSampleData.sample_values,
      mode: 'markers',
      text: filteredSampleData.otu_labels,
      marker: {
        size: filteredSampleData.sample_values,
        color: filteredSampleData.otu_ids,
        colorscale: 'Earth'
      }
  };
  // Create a data array with the above trace
  var bubble_data = [bubble_trace1];
  // Change the layout
  var bubble_layout = {
      showlegend: false,
      xaxis: { title: 'OTU ID' },
      autosize: true,
  };
  // Create the chart
  Plotly.newPlot('bubble', bubble_data, bubble_layout);

  // ##### GAUGE CHART (BONUS) #####
  // Get the wash frequency
  wfreq = filteredMetaData["wfreq"];
  // Change the location dial depending on the wash frequency
  var new_path = "";
  if (wfreq === 0){
    new_path = 'M 0.50 0.49 L 0.33 0.50 L 0.51 0.52 Z';
  }
  else if (wfreq > 0 && wfreq < 1){
    new_path = 'M 0.50 0.49 L 0.33 0.53 L 0.51 0.52 Z';
  }
  else if (wfreq === 1){
    new_path = 'M 0.50 0.49 L 0.33 0.56 L 0.51 0.52 Z';
  }
  else if (wfreq > 1 && wfreq < 2){
    new_path = 'M 0.50 0.49 L 0.35 0.59 L 0.51 0.52 Z';
  }
  else if (wfreq === 2){
    new_path = 'M 0.50 0.49 L 0.35 0.63 L 0.51 0.52 Z';
  }
  else if (wfreq > 2 && wfreq < 3){
    new_path = 'M 0.50 0.49 L 0.37 0.66 L 0.51 0.52 Z';
  }
  else if (wfreq === 3){
    new_path = 'M 0.50 0.49 L 0.40 0.68 L 0.52 0.5 Z';
  }
  else if (wfreq > 3 && wfreq < 4){
    new_path = 'M 0.50 0.49 L 0.43 0.73 L 0.52 0.5 Z';
  }
  else if (wfreq === 4){
    new_path = 'M 0.50 0.50 L 0.46 0.73 L 0.52 0.5 Z';
  }
  else if (wfreq > 4 && wfreq < 5){
    new_path = 'M 0.50 0.49 L 0.50 0.73 L 0.52 0.5 Z';
  }
  else if (wfreq === 5){
    new_path = 'M 0.50 0.51 L 0.54 0.71 L 0.52 0.5 Z';
  }
  else if (wfreq > 5 && wfreq < 6){
    new_path = 'M 0.50 0.51 L 0.58 0.71 L 0.52 0.5 Z';
  }
  else if (wfreq === 6){
    new_path = 'M 0.51 0.53 L 0.60 0.68 L 0.52 0.5 Z';
  }
  else if (wfreq > 6 && wfreq < 7){
    new_path = 'M 0.51 0.53 L 0.64 0.66 L 0.52 0.5 Z';
  }
  else if (wfreq === 7){
    new_path = 'M 0.51 0.53 L 0.66 0.64 L 0.52 0.5 Z';
  }
  else if (wfreq > 7 && wfreq < 8){
    new_path = 'M 0.51 0.53 L 0.70 0.60 L 0.52 0.5 Z';
  }
  else if (wfreq === 8){
    new_path = 'M 0.52 0.53 L 0.72 0.58 L 0.52 0.5 Z'
  }
  else if (wfreq > 8 && wfreq < 9){
    new_path = 'M 0.52 0.53 L 0.74 0.54 L 0.52 0.5 Z'
  }
  else if (wfreq === 9){
    new_path = 'M 0.52 0.53 L 0.78 0.50 L 0.52 0.5 Z'
  }
  else{
    new_path = 'M 0.50 0.51 L 0.50 0.3 L 0.51 0.51 Z';
  };
  // Create the trace
  gauge_trace1 = {
    values: [45, 5, 5, 5, 5, 5, 5, 5, 5,5],
    labels: [" ", "0-1", "1-2", "2-3", "3-4", "4-5","5-6","6-7","7-8","8-9"],
    marker: {
      colors: [
          'rgba(255, 255, 255,1)',
          'rgba(226,126,64,0.1)',
          'rgba(226,126,64,0.2)', 
          'rgba(226,126,64,0.3)',
          'rgba(226,126,64,0.4)',
          'rgba(226,126,64,0.5)',
          'rgba(226,126,64,0.6)',
          'rgba(226,126,64,0.7)',
          'rgba(226,126,64,0.8)',
          'rgba(226,126,64,0.9)',
          'rgba(226,126,64,1)', 
        ],
      },
    domain: {"x": [0, 1]},
    name: "Gauge",
    hole: .3,
    type: "pie",
    direction: "clockwise",
    rotation: 90,
    showlegend: false,
    textinfo: "label",
    textposition: "inside",
    hoverinfo: "none"
  };
  // Create a data array from the above trace
  gauge_data = [gauge_trace1];
  // Change the chart layout and add the dial
  gauge_layout = {
    title: { text: "Belly Button Washing Frequency".bold() + "<br>" + 'Scrubs per Week' },
    autosize: false,
    width: 500,
    height: 500,
    shapes: [
      {
        path: new_path,
        fillcolor: 'red',
        line: { width: 0 }
      },
      {
        type: 'circle',
        x0: 0.48,
        y0: 0.48,
        x1: 0.52,
        y1: 0.52,
        fillcolor: 'red',
        line: { width: 0 }
      },
     ]
    }
  // Create the graph
  Plotly.newPlot('gauge', gauge_data, gauge_layout);

};



d3.json("samples.json").then((importedData) => {
  data = [importedData];
  // Seperate the data into different arrays of metadata, names, and sample data
  metadata = data.map(entry => entry.metadata)[0];
  names = data.map(entry => entry.names)[0];
  samples = data.map(entry => entry.samples)[0];
  // Assign each test subject id to the select dropdown menu
  var sample_ids = samples.map(entry => entry.id);
  var selector = d3.select("#selDataset");
  sample_ids.forEach((sample) => {
    selector
        .append("option")
        .text(sample)
        .property("value", sample);
  });
  // Change the values of the graphs when the select option changes
  optionChanged();
});
