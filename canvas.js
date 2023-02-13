class Points {
    constructor(date, score, player) {
      this.x = date;
      this.y = score;
      this.player = player;
    }
}

class Data {
    constructor(data, label) {
        this.label = label;
        this.data = data;
        this.borderWidth = 1;
        this.stepped = true;
    }
}

function callChartJS(fetchedData, gameCharacters, englishName, difficulty, time) {
    const ctx = document.getElementById('wrChart');
    let dataset = [];
    fetchedData.forEach((element) => {
        const arr = []
        element.forEach(subelement => {
            const dateObject = subelement[2].replace("/", "-").replace("/", "-")
            arr.push(new Points(dateObject, subelement[0], subelement[1]))
        });
        const character = gameCharacters[fetchedData.indexOf(element)];
        const playerData = new Data(arr, character); //wip
        dataset.push(playerData);
    });
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: dataset,
        },   
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: time,
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                    },
                    title: {
                        display: true,
                        text: 'Date'
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
                        color: 'rgba(255, 255, 255, 0.05)',
                    },
                    title: {
                        display: true,
                        text: 'Score'
                    }
                }
            },
            plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: `${englishName} WR History ${difficulty}`,
                },
                subtitle: {
                  display: true,
                  text: 'Click on a category in the legend to toggle its visibility'
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const char = context[0]['dataset']['label'];
                            return "Category: "+char;
                        },
                        beforeLabel: function(context) {
                            const score = context['formattedValue'];
                            return "Score: "+score;
                        },
                        label: function(context) {
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