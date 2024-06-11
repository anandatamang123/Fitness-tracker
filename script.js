document.getElementById('exercise-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const exercise = document.getElementById('exercise').value;
    const calories = parseInt(document.getElementById('calories').value);

    if (!exercise || !calories) {
        alert('Please fill out all fields.');
        return;
    }

    const exerciseData = {
        exercise: exercise,
        calories: calories
    };

    saveExercise(exerciseData);
    updateChart();
    
    document.getElementById('exercise').value = '';
    document.getElementById('calories').value = '';
});

function saveExercise(exerciseData) {
    let exercises = [];

    if (localStorage.getItem('exercises')) {
        exercises = JSON.parse(localStorage.getItem('exercises'));
    }

    exercises.push(exerciseData);
    localStorage.setItem('exercises', JSON.stringify(exercises));
}

function updateChart() {
    const exercises = JSON.parse(localStorage.getItem('exercises')) || [];

    const exerciseLabels = exercises.map(exercise => exercise.exercise);
    const caloriesData = exercises.map(exercise => exercise.calories);

    const exerciseChart = new Chart(document.getElementById('exercise-chart'), {
        type: 'bar',
        data: {
            labels: exerciseLabels,
            datasets: [{
                label: 'Calories Burned',
                data: caloriesData,
                backgroundColor: '#4CAF50'
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
