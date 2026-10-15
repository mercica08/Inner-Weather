const moodOptions = document.querySelectorAll('input[name="mood"]');
const forecastIcon = document.getElementById('forecast-icon');
const forecastTitle = document.getElementById('forecast-title');
const forecastMessage = document.getElementById('forecast-message');
const forecastActivity = document.getElementById('forecast-activity');
const feedback = document.getElementById('feedback');
const forecastSection = document.querySelector('.forecast-section');
const nightMode = document.getElementById('night-mode');
const themeText = document.querySelector('.theme-control span:last-child');

const forecasts = {
    sunny: {
        icon: '☀️',
        title: 'Clear skies ahead!',
        message: 'It sounds like there is some sunshine in your world today. Enjoy the good moments and let yourself celebrate them.',
        activity: 'Listen to your favourite song or share a happy moment with someone.',
        theme: 'mood-sunny'
    },
    rainy: {
        icon: '🌧️',
        title: 'A little rain is okay.',
        message: 'You do not have to feel cheerful all the time. Give yourself permission to feel what you feel, without judging yourself.',
        activity: 'Make a warm drink, listen to calming music, or write down what is on your mind.',
        theme: 'mood-rainy'
    },
    cloudy: {
        icon: '☁️',
        title: 'Cloudy, with room to breathe.',
        message: 'It is okay not to have every answer right now. You can take things one small step at a time.',
        activity: 'Step away from distractions for five minutes and focus on one simple task.',
        theme: 'mood-cloudy'
    },
    stormy: {
        icon: '⛈️',
        title: 'The storm will pass.',
        message: 'When everything feels like too much, you do not need to solve it all at once. Pause and give yourself a little space.',
        activity: 'Take a few slow breaths, stretch gently, or step somewhere quiet for a moment.',
        theme: 'mood-stormy'
    }
};

function scrollToForecast() {
    const box = forecastSection.getBoundingClientRect();
    const isFullyVisible = box.top >= 0 && box.bottom <= window.innerHeight;
    if (isFullyVisible) {
        return;
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    forecastSection.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
    });
}

moodOptions.forEach(function (option) {
    option.addEventListener('change', function () {
        const selectedMood = option.value;
        const forecast = forecasts[selectedMood];
        forecastIcon.textContent = forecast.icon;
        forecastTitle.textContent = forecast.title;
        forecastMessage.textContent = forecast.message;
        forecastActivity.textContent = forecast.activity;
        document.body.classList.remove(
            'mood-sunny',
            'mood-rainy',
            'mood-cloudy',
            'mood-stormy'
        );
        document.body.classList.add(forecast.theme);
        feedback.textContent = 'Your forecast has been updated.';
        scrollToForecast();
    });
});

nightMode.addEventListener('change', function () {
    document.body.classList.toggle('night', nightMode.checked);
    if (nightMode.checked) {
        themeText.textContent = 'Switch to day mode';
        feedback.textContent = 'Night mode is on. Take it easy.';
    } else {
        themeText.textContent = 'Switch to night mode';
        feedback.textContent = 'Day mode is on. Have a lovely day.';
    }
});
