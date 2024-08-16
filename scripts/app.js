// scripts/app.js
new Vue({
    el: '#app',
    data: {
      randomFact: '',
      city: 'London Ontario',
      newCity: '',
      weather: {
        temperature: '',
        wind: '',
        description: ''
      },
      word: {
        word: '',
        phonetic: '',
        partOfSpeech: '',
        definition: ''
      },
      newWord: ''
    },
    created() {
      this.getRandomFact();
      this.getWeather();
      this.getDefinition('bottle');
    },
    methods: {
      async getRandomFact() {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
        const data = await response.json();
        this.randomFact = data.text;
      },
      async getWeather() {
        const city = this.newCity || this.city;
        const response = await fetch(`https://goweather.herokuapp.com/weather/${encodeURIComponent(city)}`);
        const data = await response.json();
        this.weather.temperature = data.temperature;
        this.weather.wind = data.wind;
        this.weather.description = data.description;
        this.city = city;
        this.newCity = '';
      },
      async getDefinition(word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        const definition = data[0].meanings[0].definitions[0];
        this.word.word = data[0].word;
        this.word.phonetic = data[0].phonetic;
        this.word.partOfSpeech = data[0].meanings[0].partOfSpeech;
        this.word.definition = definition.definition;
        this.newWord = '';
      }
    }
  });