window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    const languageSelect = document.getElementById('language-select');
    const startButton = document.getElementById('start-button');
    const daysSelection = document.getElementById('days-selection');
    const wordsContainer = document.getElementById('words-container');
    const timerElement = document.getElementById('time');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const selectedName = this.document.getElementById('selectedName');
    let selectedLanguage = 'spanish';
    let currentDay = 1;
    let currentWordIndex = 0;
    let wordsList = [];

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        content.style.display = 'block';
    }, 2000);
  const volume = document.createElement('i');
    volume.classList.add('fa-solid', 'fa-volume-high');
    
    startButton.addEventListener('click', function () {
     
        selectedLanguage = languageSelect.value;
        if(selectedLanguage === "choose the language")  {
            alert("Please first choose desired language");
            return;
        }
        languageSelect.style.display = 'none';
        selectedName.innerHTML = `<i class="fa-solid fa-globe"></i> ${selectedLanguage}`
        selectedName.style.color = 'red'
        daysSelection.innerHTML = '';
        for (let day = 1; day <= 10; day++) {
            const dayButton = document.createElement('button');
            dayButton.innerText = 'Day ' + day;
            dayButton.addEventListener('click', () => {
                selectedName.innerHTML = `<i class="fa-solid fa-globe"></i> ${selectedLanguage} day ${day}`;
                startLearning(day)
            } );
            daysSelection.appendChild(dayButton);
        }
        document.getElementById('learning-content').style.display = 'block';
   
        startButton.style.display = 'none';
        languageSelect.parentNode.insertBefore(volume, languageSelect.nextSibling);

        
    });


 
    function startLearning(day) {
        currentDay = day;
        currentWordIndex = 0;
        wordsList = getWordsForDay(selectedLanguage, day);
        displayWord();
        startTimer();
    }

    function getWordsForDay(language, day) {
        const words = {
            spanish: [
                // Day 1
                ['hello', 'hola'], ['goodbye', 'adiós'], ['please', 'por favor'], 
                ['thank you', 'gracias'], ['yes', 'sí'], ['no', 'no'], 
                ['sorry', 'lo siento'], ['excuse me', 'perdón'], ['bathroom', 'baño'], ['water', 'agua'],
                // Day 2
                ['friend', 'amigo'], ['family', 'familia'], ['food', 'comida'], 
                ['house', 'casa'], ['school', 'escuela'], ['car', 'coche'], 
                ['money', 'dinero'], ['book', 'libro'], ['street', 'calle'], ['city', 'ciudad'],
                // Day 3
                ['cat', 'gato'], ['dog', 'perro'], ['bird', 'pájaro'], 
                ['fish', 'pez'], ['horse', 'caballo'], ['cow', 'vaca'], 
                ['sheep', 'oveja'], ['pig', 'cerdo'], ['chicken', 'pollo'], ['duck', 'pato'],
                // Days 4-10
                ['apple', 'manzana'], ['banana', 'plátano'], ['orange', 'naranja'], 
                ['grape', 'uva'], ['pear', 'pera'], ['peach', 'durazno'], 
                ['pineapple', 'piña'], ['strawberry', 'fresa'], ['melon', 'melón'], ['lemon', 'limón']
            ],
            russian: [
                // Day 1
                ['hello', 'здравствуйте'], ['goodbye', 'до свидания'], ['please', 'пожалуйста'], 
                ['thank you', 'спасибо'], ['yes', 'да'], ['no', 'нет'], 
                ['sorry', 'извините'], ['excuse me', 'простите'], ['bathroom', 'ванная'], ['water', 'вода'],
                // Day 2
                ['friend', 'друг'], ['family', 'семья'], ['food', 'еда'], 
                ['house', 'дом'], ['school', 'школа'], ['car', 'машина'], 
                ['money', 'деньги'], ['book', 'книга'], ['street', 'улица'], ['city', 'город'],
                // Day 3
                ['cat', 'кошка'], ['dog', 'собака'], ['bird', 'птица'], 
                ['fish', 'рыба'], ['horse', 'лошадь'], ['cow', 'корова'], 
                ['sheep', 'овца'], ['pig', 'свинья'], ['chicken', 'курица'], ['duck', 'утка'],
                // Days 4-10
                ['apple', 'яблоко'], ['banana', 'банан'], ['orange', 'апельсин'], 
                ['grape', 'виноград'], ['pear', 'груша'], ['peach', 'персик'], 
                ['pineapple', 'ананас'], ['strawberry', 'клубника'], ['melon', 'дыня'], ['lemon', 'лимон']
            ],
            polish: [
                // Day 1
                ['hello', 'cześć'], ['goodbye', 'do widzenia'], ['please', 'proszę'], 
                ['thank you', 'dziękuję'], ['yes', 'tak'], ['no', 'nie'], 
                ['sorry', 'przepraszam'], ['excuse me', 'przepraszam'], ['bathroom', 'łazienka'], ['water', 'woda'],
                // Day 2
                ['friend', 'przyjaciel'], ['family', 'rodzina'], ['food', 'jedzenie'], 
                ['house', 'dom'], ['school', 'szkoła'], ['car', 'samochód'], 
                ['money', 'pieniądze'], ['book', 'książka'], ['street', 'ulica'], ['city', 'miasto'],
                // Day 3
                ['cat', 'kot'], ['dog', 'pies'], ['bird', 'ptak'], 
                ['fish', 'ryba'], ['horse', 'koń'], ['cow', 'krowa'], 
                ['sheep', 'owca'], ['pig', 'świnia'], ['chicken', 'kurczak'], ['duck', 'kaczka'],
                // Days 4-10
                ['apple', 'jabłko'], ['banana', 'banan'], ['orange', 'pomarańcza'], 
                ['grape', 'winogrono'], ['pear', 'gruszka'], ['peach', 'brzoskwinia'], 
                ['pineapple', 'ananas'], ['strawberry', 'truskawka'], ['melon', 'melon'], ['lemon', 'cytryna']
            ],
            french: [
                // Day 1
                ['hello', 'bonjour'], ['goodbye', 'au revoir'], ['please', 's’il vous plaît'], 
                ['thank you', 'merci'], ['yes', 'oui'], ['no', 'non'], 
                ['sorry', 'désolé'], ['excuse me', 'excusez-moi'], ['bathroom', 'salle de bain'], ['water', 'eau'],
                // Day 2
                ['friend', 'ami'], ['family', 'famille'], ['food', 'nourriture'], 
                ['house', 'maison'], ['school', 'école'], ['car', 'voiture'], 
                ['money', 'argent'], ['book', 'livre'], ['street', 'rue'], ['city', 'ville'],
                // Day 3
                ['cat', 'chat'], ['dog', 'chien'], ['bird', 'oiseau'], 
                ['fish', 'poisson'], ['horse', 'cheval'], ['cow', 'vache'], 
                ['sheep', 'mouton'], ['pig', 'cochon'], ['chicken', 'poulet'], ['duck', 'canard'],
                // Days 4-10
                ['apple', 'pomme'], ['banana', 'banane'], ['orange', 'orange'], 
                ['grape', 'raisin'], ['pear', 'poire'], ['peach', 'pêche'], 
                ['pineapple', 'ananas'], ['strawberry', 'fraise'], ['melon', 'melon'], ['lemon', 'citron']
            ],
            turkish: [
                // Day 1
                ['hello', 'merhaba'], ['goodbye', 'hoşçakal'], ['please', 'lütfen'], 
                ['thank you', 'teşekkür ederim'], ['yes', 'evet'], ['no', 'hayır'], 
                ['sorry', 'özür dilerim'], ['excuse me', 'affedersiniz'], ['bathroom', 'banyo'], ['water', 'su'],
                // Day 2
                ['friend', 'arkadaş'], ['family', 'aile'], ['food', 'yemek'], 
                ['house', 'ev'], ['school', 'okul'], ['car', 'araba'], 
                ['money', 'para'], ['book', 'kitap'], ['street', 'sokak'], ['city', 'şehir'],
                // Day 3
                ['cat', 'kedi'], ['dog', 'köpek'], ['bird', 'kuş'], 
                ['fish', 'balık'], ['horse', 'at'], ['cow', 'inek'], 
                ['sheep', 'koyun'], ['pig', 'domuz'], ['chicken', 'tavuk'], ['duck', 'ördek'],
                // Days 4-10
                ['apple', 'elma'], ['banana', 'muz'], ['orange', 'portakal'], 
                ['grape', 'üzüm'], ['pear', 'armut'], ['peach', 'şeftali'], 
                ['pineapple', 'ananas'], ['strawberry', 'çilek'], ['melon', 'kavun'], ['lemon', 'limon']
            ]
        };

        const wordsPerDay = {
            1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            2: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            3: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
            4: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
            5: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
            6: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
            7: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
            8: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
            9: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
            10: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
        };

        const dayIndices = wordsPerDay[day];
        return dayIndices.map((index, i) => `${i + 1}. ${words[language][index][0]} - ${words[language][index][1]}`);
    }

    function displayWord() {
        if (currentWordIndex >= 0 && currentWordIndex < wordsList.length) {
            wordsContainer.innerText = wordsList[currentWordIndex];
        }
    }

    prevButton.addEventListener('click', function () {
        if (currentWordIndex > 0) {
            currentWordIndex--;
            displayWord();
        } else {
            alert('You are on the first word.');
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentWordIndex < wordsList.length - 1) {
            currentWordIndex++;
            displayWord();
        } else {
            if (currentDay < 10) {
                currentDay++;
                wordsList = getWordsForDay(selectedLanguage, currentDay);
                currentWordIndex = 0;
                displayWord();
                nextButton.innerText = 'Next';
                alert(`Congrats, you completed Day ${currentDay - 1}! Starting Day ${currentDay}`);
            } else {
                alert('Congrats, you completed the entire course!');
            }
        }
        if (currentWordIndex === wordsList.length - 1) {
            nextButton.innerText = `Day ${currentDay + 1}`;
        } else {
            nextButton.innerText = 'Next';
        }
    });

    function startTimer() {
        let time = 120;
        const timer = setInterval(() => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            time--;
            if (time < 0) {
                clearInterval(timer);
                alert('Congrats, you completed today\'s lesson!');
            }
        }, 1000);
    }
});
