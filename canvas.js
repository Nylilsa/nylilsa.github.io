class Points {
    constructor(date, score, player) {
      this.x = date;
      this.y = score;
      this.player = player;
    }
}

function callChartJS(fetchedData) {

    const marisa = fetchedData[0];
    const youmu = fetchedData[1];
    const reimu = fetchedData[2];
    const sanae = fetchedData[3];

    const plotMarisa = [];
    marisa.forEach(element => {
        const dateString = element[2];
        const dateParts = dateString.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        const dateObject = dateString.replace("/", "-").replace("/", "-")
        plotMarisa.push(new Points(dateObject, element[0], element[1]))
    });
    const plotYoumu = [];
    youmu.forEach(element => {
        const dateString = element[2];
        const dateParts = dateString.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        const dateObject = new Date(dateString); 
        plotYoumu.push(new Points(dateObject, element[0], element[1]))
    });
    const plotReimu = [];
    reimu.forEach(element => {
        const dateString = element[2];
        const dateParts = dateString.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        const dateObject = new Date(dateString); 
        plotReimu.push(new Points(dateObject, element[0], element[1]))
    });
    const plotSanae = [];
    sanae.forEach(element => {
        const dateString = element[2];
        const dateParts = dateString.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        const dateObject = new Date(dateString); 
        plotSanae.push(new Points(dateObject, element[0], element[1]))
    });


    const ctx = document.getElementById('wrChart');

    const csv = `Time,Temperature
2020-02-15,-8.25
2020-02-16,-8.08
2020-02-17,-8.41
2020-02-18,-8.2`;

const csvToChartData = csv => {
  const lines = csv.trim().split('\n');
  lines.shift(); // remove titles (first line)
  return lines.map(line => {
    const [date, temperature] = line.split(',');
    return new Points(date, temperature)
  });
};
    console.log(csvToChartData(csv))
    console.log(plotMarisa)

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
              label: 'Marisa',
              data: plotMarisa,
              borderWidth: 1,
              stepped: true,
            },
            {
                label: 'Reimu',
                data: plotReimu,
                borderWidth: 1,
                stepped: true,
              },
            {
                label: 'Sanae',
                data: plotSanae,
                borderWidth: 1,
                stepped: true,
              },
            {
                label: 'Youmu',
                data: plotYoumu,
                borderWidth: 1,
                stepped: true,
              }]
        },   
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'year'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value, index, values) {
                            return (value / 1e9).toFixed(2) + 'b';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.00)',
                    }
                },

            },
            plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: 'TD WR History Lunatic',
                },
                subtitle: {
                  display: true,
                  text: 'Click on a category in the legend to toggle its visibility'
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const char = context[0]['dataset']['label'];
                            //console.log(context) // returns Youmu/Marisa/Reimu
                            return "Category: "+char;
                        },
                        beforeLabel: function(context) {
                            const score = context['formattedValue'];
                            return "Score: "+score;
                        },
                        label: function(context) {
                            console.log(context)
                            const player = context['raw']['player'];
                            return "By: "+player;
                        },
                        afterLabel: function(context) {
                            const date = context['label'].split(",", 2).join(",");
                            return "Date: "+date;
                        }
                    }
                }
            }
        }
    });
}


function callCanvas(data) {
    console.log(data)
    const marisa = data[0];
    const youmu = data[1];
    const reimu = data[2];
    const sanae = data[3];

    const plotMarisa = [];
    marisa.forEach(element => {
        const dateString = element[2];
        const dateParts = dateString.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        const dateObject = new Date(dateString); 
        plotMarisa.push(new Points(dateObject, element[0]))
    });
    const plotYoumu = [];
    youmu.forEach(element => {
        const dateString = element[2];
        const dateParts = dateString.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        const dateObject = new Date(dateString); 
        plotYoumu.push(new Points(dateObject, element[0]))
    });
    const plotReimu = [];
    reimu.forEach(element => {
        const dateString = element[2];
        const dateParts = dateString.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        const dateObject = new Date(dateString); 
        plotReimu.push(new Points(dateObject, element[0]))
    });
    const plotSanae = [];
    sanae.forEach(element => {
        const dateString = element[2];
        const dateParts = dateString.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        const dateObject = new Date(dateString); 
        plotSanae.push(new Points(dateObject, element[0]))
    });

    const chart= new CanvasJS.Chart("wrChart", {
        backgroundColor: "transparent",

        title:{
            text: "TD Lunatic WR progression by Shottype*",
            fontColor: "white",
            fontFamily: "arial"
        },

        axisX: {
            lineThickness: 2,
            labelFontColor: "white",
            labelFontSize: 12,
        },
        
        axisY: {
            labelFontColor: "white",
            labelFontSize: 13,
        },

        legend: {
            fontColor: "white",
            fontSize: 14,
            cursor: "pointer",
            itemclick: function (e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }
        },

        data: [
            {
                showInLegend: true,
                name: "Marisa",
                color: "#fada5e",
                type: "stepLine",  
                dataPoints: plotMarisa,
            },
            {
                showInLegend: true,
                color: "silver",
                name: "Youmu",
                type: "stepLine",  
                dataPoints: plotYoumu,
            },
            {
                showInLegend: true,
                color: "crimson",
                name: "Reimu",
                type: "stepLine",  
                dataPoints: plotReimu,
            },
            {
                showInLegend: true,
                color: "lime",
                name: "Sanae",
                type: "stepLine",  
                dataPoints: plotSanae,
            }
        ]
    });
    chart.render();
    //cleanCanvas();
}



function cleanCanvas() {
    const cleanMeUp= document.getElementsByClassName("canvasjs-chart-canvas")[0];
    document.getElementsByClassName("canvasjs-chart-canvas")[0].style.position = "relative";
    document.getElementsByClassName("canvasjs-chart-canvas")[1].style.position = "absolute";

}