new Vue({
    el: '#app',
    data: {
        randomFact: '',
        weather: {
            location: 'London, Ontario',
            temperature: '',
            wind: '',
            description: ''
        },
        city: '',
        word: '',
        definition: null
    },
    created() {
        this.getRandomFact();
        this.getWeather();
    },
    methods: {
        getRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data.text;
                });
        },
        getWeather() {
            const location = this.city || 'London Ontario';
            fetch(`https://goweather.herokuapp.com/weather/London%20Ontario`)
                .then(response => response.json())
                .then(data => {
                    this.weather = {
                        location: location,
                        temperature: data.temperature,
                        wind: data.wind,
                        description: data.description
                    };
                });
        },
        defineWord() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/Bottle`)
                .then(response => response.json())
                .then(data => {
                    const entry = data[0];
                    this.definition = {
                        word: entry.word,
                        phonetic: entry.phonetic,
                        partOfSpeech: entry.meanings[0].partOfSpeech,
                        meaning: entry.meanings[0].definitions[0].definition
                    };
                });
        }
    }
});
