const app = Vue.createApp({
    data() {
        return {
            randomFact: '',
            weather: {
                location: 'London, Ontario', // default london, ontario
                temperature: '',
                wind: '',
                description: ''
            },
            city: '', 
            word: '',
            definition: null
        };
    },
    mounted() {
        this.getRandomFact();
        this.getWeather(); // weather module mount
    },
    methods: {
        getRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data.text;
                })
                .catch(error => console.error('Error fetching random fact:', error));
        },
        getWeather() {
            const location = this.city || 'London Ontario'; // London Defaults
            fetch(`https://goweather.herokuapp.com/weather/${location}`)
                .then(response => response.json())
                .then(data => {
                    this.weather = {
                        location: 'London, Ontario',
                        temperature: data.temperature,
                        wind: data.wind,
                        description: data.description
                    };
                })
                .catch(error => console.error('Error fetching weather data:', error));
        },
        defineWord() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
                .then(response => response.json())
                .then(data => {
                    const entry = data[0];
                    this.definition = {
                        word: entry.word,
                        phonetic: entry.phonetic,
                        partOfSpeech: entry.meanings[0].partOfSpeech,
                        meaning: entry.meanings[0].definitions[0].definition
                    };
                })
                .catch(error => console.error('Error fetching word definition:', error));
        }
    }
});

app.mount('#app');
