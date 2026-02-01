const pie = document.getElementById('pie-chart');
const bar = document.getElementById('bar-chart');

const labels = ['Oxygène', 'Silicium', 'Aluminium', 'Fer', 'Calcium', 'Autres', 'Magnésium', 'Carbone', 'Hydrogène', 'Azote', 'Hélium', 'Néon'];

const earth = {
    label: 'Croûte Terrestre',
    data: [46, 28, 8, 6, 4, 8]
};
const moon = {
    label: 'Sol Lunaire',
    data: [42, 21, 6, 13, 7, 3, 5]
};
const living = {
    label: 'Monde du Vivant',
    data: [65, 0, 0, 0, 0, 4, 0, 18, 10, 3]
};
const sun = {
    label: 'Photosphère du Soleil',
    data: [0.77, 0, 0, 0.16, 0, 0.35, 0, 0.29, 73.46, 0, 24.85, 0.12]
};

function labelPercent(context) {
    let label = context.dataset.label || '';

    if (label) {
        label += ': '
    }
    label += context.formattedValue + '%';

    return label;
}

const pieConfig = {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [earth]
    },
    options: {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    filter: function (legend, data) {
                        const index = legend.index;
                        const value = data.datasets[0].data[index] ?? 0;
                        const show = value > 0;

                        return show
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: labelPercent
                }
            },
            title: {
                display: true,
                text: earth.label
            }
        }
    }
};

const pieChart = new Chart(
    pie,
    pieConfig
);

// Setting switcher
const switcher = document.getElementById('switcher');
switcher.onclick = () => {
    if (pieChart.data.datasets[0] == earth) {
        pieChart.data.datasets[0] = moon;
        pieChart.titleBlock.options.text = moon.label;
    } else {
        pieChart.data.datasets[0] = earth;
        pieChart.titleBlock.options.text = earth.label;
    }

    pieChart.update();
};

// Get dataset for each element/label 
const labelsAsDatasets = [];
const iterators = [earth, moon, living, sun].map(e => e.data[Symbol.iterator]());

let values = [];
const all = {
    get hasNext() {
        values = iterators.map(iter => iter.next());
        return values.some(v => !(v.done))
    }
};

var i = 0;
while (all.hasNext) {
    labelsAsDatasets.push({
        label: labels[i],
        data: values.map(v => v.value)
    });
    i++
}

const datasetsAsLabels = [earth.label, moon.label, living.label, sun.label];

const barConfig = {
    type: 'bar',
    data: {
        labels: datasetsAsLabels,
        datasets: labelsAsDatasets
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: labelPercent
                }
            },
            title: {
                display: true,
                text: 'l\'abondance massique des éléments chimiques dans le monde du vivant, la croûte terrestre, le sol lunaire et la photosphère du Soleil'
            }
        },
        aspectRatio: 1/1,
        scales: {
            x: {
                stacked: false
            }
        }
    }
};

const barChart = new Chart(
    bar,
    barConfig
)
