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

function callChartJS(fetchedData, gameCharacters, englishName, difficulty, time, game) {
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
                            return roundedTicks(value, index, values, game);
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

function roundedTicks(value, index, values, game) {
    const largeNumbers = {
        "Millions": {
            "number": 1e6,
            "suffix": 'm'
        },
        "Billions": {
            "number": 1e9,
            "suffix": 'b'
        },
    }
    let decimals = 2;
    let selector = "Billions";
    if (game == "th01") {selector = "Millions"}
    if (game == "th02") {selector = "Millions"}
    if (game == "th03") {selector = "Millions"; decimals = 0}
    if (game == "th04") {selector = "Millions"; decimals = 0}
    if (game == "th05") {selector = "Millions"; decimals = 0}
    if (game == "th06") {selector = "Millions"; decimals = 0}
    if (game == "th09") {selector = "Millions"; decimals = 0}
    if (game == "th10") {selector = "Billions"; decimals = 3}
    if (game == "th128") {selector = "Millions"; decimals = 0}
    return (value / largeNumbers[selector]["number"]).toFixed(decimals) + largeNumbers[selector]["suffix"];
}