const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

var dropDown = d3.select("#selDataset");
d3.json(url).then(function (data) {
    var names = data.names;
    names.forEach((sample) => {
        dropDown.append("option").text(sample).property("value", sample)
    });
});


function optionChanged(option) {
    d3.json(url).then(function (data) {
	    console.log(data)
        var card = d3.select("#sample-metadata");
	card.selectAll("p").remove();
        var metadata = data.metadata.filter(row => row.id == option);
	var paragraphs = card.selectAll("p")
	  .data(metadata)
	  .enter()
	  .append("p")
	  .text(function(d) {
	    return "id: " + d.id + " ethnicity: " + d.ethnicity + " gender: " + d.gender + " age: " + d.age + " location: " + d.location + " bbtype: " + d.bbtype + " wfreq: " + d.wfreq;
	  });	

        var sample = data.samples.filter(row => row.id == option);
        var values = sample[0].sample_values;
        var slice = values.slice(0,10).reverse();
        var otus = sample[0].otu_ids;
        var otus_slice = otus.slice(0,10).reverse();
        var otu_labels = sample[0].otu_labels;
        var otu_labels_slice = otu_labels.slice(0,10).reverse();

        Plotly.newPlot("bar",
		[{
		    x: slice,
		    y: otus_slice.map(item => `OTU ${item}`),
		    type: "bar",
		    orientation: "h",
		    text: otu_labels_slice
		}]
	);


        Plotly.newPlot("bubble", 
		[{
		    x: otus,
		    y: values,
		    mode: "markers",
		    marker: {
			size: values,
			color: otus
		    },
		    text: otus
		}]
	);

    });

};




