
  window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const content = document.getElementById("content");
    const languageSelect = document.getElementById("language-select");
    const startButton = document.getElementById("start-button");
    const daysSelection = document.getElementById("days-selection");
    const wordsContainer = document.getElementById("words-container");
    const timerElement = document.getElementById("time");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const selectedName = this.document.getElementById("selectedName");
    let selectedLanguage = "spanish";
    let currentDay = 1;
    let currentWordIndex = 0;
    let wordsList = [];
    let currentTranslatedWord = "";
  
    setTimeout(() => {
      loadingScreen.style.display = "none";
      content.style.display = "block";
    }, 2000);
    const volume = document.createElement("i");
    volume.classList.add("fa-solid", "fa-volume-high");
    
    startButton.addEventListener("click", function () {
        selectedLanguage = languageSelect.value;
        if (selectedLanguage === "choose the language") {
          alert("Please first choose desired language");
          return;
        }
        languageSelect.style.display = "none";
        selectedName.innerHTML = `<i class="fa-solid fa-globe"></i> ${selectedLanguage}`;
        selectedName.style.color = "red";
        daysSelection.innerHTML = "";
      
        // Array to keep track of completion state for each day
        let completedDays = new Array(10).fill(false);
      
        // Variable to keep track of the currently active day
        let currentDay = 1;
      
        // Function to update day button styles based on completion
        const updateDayButtons = () => {
          for (let i = 1; i <= 10; i++) {
            const button = document.getElementById(`dayButton${i}`);
            if (completedDays[i - 1]) {
              button.style.backgroundColor = '#0056B3'; // Make completed day buttons fully visible
              button.disabled = false; // Enable completed day buttons
            } else if (i === currentDay) {
              button.style.backgroundColor = '#0056B3' // Make current day button fully visible
              button.disabled = false; // Enable current day button
            } else {
              button.style.backgroundColor = 'red' // Make other day buttons faded
              button.disabled = true; // Disable inaccessible day buttons
            }
          }
        };
      
        const dayButtonClickHandler = (day) => {
          return () => {
            selectedName.innerHTML = `<i class="fa-solid fa-globe"></i> ${selectedLanguage} day ${day}`;
            startLearning(day);
            completedDays[day - 1] = true; // Mark current day as completed
            currentDay = day + 1; // Move to the next day
      
            updateDayButtons();
          };
        };
      
        for (let day = 1; day <= 10; day++) {
          const dayButton = document.createElement("button");
          dayButton.innerText = "Day " + day;
          dayButton.addEventListener("click", dayButtonClickHandler(day));
          
          if (day === 1) {
            dayButton.style.opacity = 1; // First day button is fully visible initially
            dayButton.disabled = false; // First day button is enabled initially
          } else {
            dayButton.style.backgroundColor = 'red' // Other day buttons are initially faded
            dayButton.disabled = true; // Other day buttons are disabled initially
          }
      
          dayButton.id = `dayButton${day}`;
          daysSelection.appendChild(dayButton);
        }
      
        document.getElementById("learning-content").style.display = "block";
        startButton.style.display = "none";
        languageSelect.parentNode.insertBefore(volume, languageSelect.nextSibling);
      
        updateDayButtons();
      });
      
  
    volume.addEventListener("click", function () {
      if (currentTranslatedWord) {
        const utterance = new SpeechSynthesisUtterance(currentTranslatedWord);
        utterance.lang = getLanguageCode(selectedLanguage);
        const voices = speechSynthesis.getVoices();
        const voice = voices.find(voice => voice.lang === utterance.lang);
        if (voice) {
          utterance.voice = voice;
        }
        speechSynthesis.speak(utterance);
      }
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
            ["hello", "hola"],
            ["goodbye", "adiós"],
            ["please", "por favor"],
            ["thank you", "gracias"],
            ["yes", "sí"],
            ["no", "no"],
            ["sorry", "lo siento"],
            ["excuse me", "perdón"],
            ["bathroom", "baño"],
            ["water", "agua"],
            // Day 2
            ["friend", "amigo"],
            ["family", "familia"],
            ["food", "comida"],
            ["house", "casa"],
            ["school", "escuela"],
            ["car", "coche"],
            ["money", "dinero"],
            ["book", "libro"],
            ["street", "calle"],
            ["city", "ciudad"],
            // Day 3
            ["cat", "gato"],
            ["dog", "perro"],
            ["bird", "pájaro"],
            ["fish", "pez"],
            ["horse", "caballo"],
            ["cow", "vaca"],
            ["sheep", "oveja"],
            ["pig", "cerdo"],
            ["chicken", "pollo"],
            ["duck", "pato"],
            // Days 4-10
            ["apple", "manzana"],
            ["banana", "plátano"],
            ["orange", "naranja"],
            ["grape", "uva"],
            ["pear", "pera"],
            ["peach", "durazno"],
            ["pineapple", "piña"],
            ["strawberry", "fresa"],
            ["melon", "melón"],
            ["lemon", "limón"],
            //Day 5
            ["car", "coche"],
            ["house", "casa"],
            ["book", "libro"],
            ["tree", "árbol"],
            ["dog", "perro"],
            ["cat", "gato"],
            ["bicycle", "bicicleta"],
            ["computer", "computadora"],
            ["school", "escuela"],
            ["sun", "sol"],
            // Day 6
            ["flower", "flor"],
            ["river", "río"],
            ["mountain", "montaña"],
            ["ocean", "océano"],
            ["cloud", "nube"],
            ["rain", "lluvia"],
            ["snow", "nieve"],
            ["wind", "viento"],
            ["fire", "fuego"],
            ["earth", "tierra"],
            //Day 7
            ["sky", "cielo"],
            ["star", "estrella"],
            ["moon", "luna"],
            ["sun", "sol"],
            ["planet", "planeta"],
            ["forest", "bosque"],
            ["desert", "desierto"],
            ["beach", "playa"],
            ["island", "isla"],
            ["lake", "lago"],
            // Day 8
            ["valley", "valle"],
            ["hill", "colina"],
            ["rock", "roca"],
            ["cave", "cueva"],
            ["sand", "arena"],
            ["cliff", "acantilado"],
            ["wave", "ola"],
            ["lightning", "relámpago"],
            ["thunder", "trueno"],
            ["storm", "tormenta"],
            // Day 9
            ["rainbow", "arcoíris"],
            ["fog", "niebla"],
            ["dew", "rocío"],
            ["frost", "escarcha"],
            ["hail", "granizo"],
            ["mist", "bruma"],
            ["sprout", "brote"],
            ["branch", "rama"],
            ["leaf", "hoja"],
            ["root", "raíz"],
            // Day 10
            ["trunk", "tronco"],
            ["bark", "corteza"],
            ["seed", "semilla"],
            ["blossom", "floración"],
            ["bush", "arbusto"],
            ["vine", "vid"],
            ["mushroom", "hongo"],
            ["fern", "helecho"],
            ["meadow", "pradera"],
            ["prairie", "pradera"],
          ],
          russian: [
            // Day 1
            ["hello", "здравствуйте"],
            ["goodbye", "до свидания"],
            ["please", "пожалуйста"],
            ["thank you", "спасибо"],
            ["yes", "да"],
            ["no", "нет"],
            ["sorry", "извините"],
            ["excuse me", "простите"],
            ["bathroom", "ванная"],
            ["water", "вода"],
            // Day 2
            ["friend", "друг"],
            ["family", "семья"],
            ["food", "еда"],
            ["house", "дом"],
            ["school", "школа"],
            ["car", "машина"],
            ["money", "деньги"],
            ["book", "книга"],
            ["street", "улица"],
            ["city", "город"],
            // Day 3
            ["cat", "кошка"],
            ["dog", "собака"],
            ["bird", "птица"],
            ["fish", "рыба"],
            ["horse", "лошадь"],
            ["cow", "корова"],
            ["sheep", "овца"],
            ["pig", "свинья"],
            ["chicken", "курица"],
            ["duck", "утка"],
            // Days 4-10
            ["apple", "яблоко"],
            ["banana", "банан"],
            ["orange", "апельсин"],
            ["grape", "виноград"],
            ["pear", "груша"],
            ["peach", "персик"],
            ["pineapple", "ананас"],
            ["strawberry", "клубника"],
            ["melon", "дыня"],
            ["lemon", "лимон"],
            //Day 5
            ["rainbow", "радуга"],
            ["fog", "туман"],
            ["dew", "роса"],
            ["frost", "иней"],
            ["hail", "град"],
            ["mist", "дымка"],
            ["sprout", "росток"],
            ["branch", "ветка"],
            ["leaf", "лист"],
            ["root", "корень"],
            //Day 6
            ["valley", "долина"],
            ["hill", "холм"],
            ["rock", "скала"],
            ["cave", "пещера"],
            ["sand", "песок"],
            ["cliff", "утес"],
            ["wave", "волна"],
            ["lightning", "молния"],
            ["thunder", "гром"],
            ["storm", "буря"],
            // Day 7
            ["earth", "земля"],
            ["sky", "небо"],
            ["star", "звезда"],
            ["moon", "луна"],
            ["planet", "планета"],
            ["forest", "лес"],
            ["desert", "пустыня"],
            ["beach", "пляж"],
            ["island", "остров"],
            ["lake", "озеро"],
            // Day 8
            ["sun", "солнце"],
            ["flower", "цветок"],
            ["river", "река"],
            ["mountain", "гора"],
            ["ocean", "океан"],
            ["cloud", "облако"],
            ["rain", "дождь"],
            ["snow", "снег"],
            ["wind", "ветер"],
            ["fire", "огонь"],
            // Day 9
            ["cherry", "вишня"],
            ["car", "машина"],
            ["house", "дом"],
            ["book", "книга"],
            ["tree", "дерево"],
            ["dog", "собака"],
            ["cat", "кошка"],
            ["bicycle", "велосипед"],
            ["computer", "компьютер"],
            ["school", "школа"],
            // Day 10
            ["trunk", "ствол"],
            ["bark", "кора"],
            ["seed", "семя"],
            ["blossom", "цветение"],
            ["bush", "куст"],
            ["vine", "лоза"],
            ["mushroom", "гриб"],
            ["fern", "папоротник"],
            ["meadow", "луг"],
            ["prairie", "прерия"],
          ],
          polish: [
            // Day 1
            ["hello", "cześć"],
            ["goodbye", "do widzenia"],
            ["please", "proszę"],
            ["thank you", "dziękuję"],
            ["yes", "tak"],
            ["no", "nie"],
            ["sorry", "przepraszam"],
            ["excuse me", "przepraszam"],
            ["bathroom", "łazienka"],
            ["water", "woda"],
            // Day 2
            ["friend", "przyjaciel"],
            ["family", "rodzina"],
            ["food", "jedzenie"],
            ["house", "dom"],
            ["school", "szkoła"],
            ["car", "samochód"],
            ["money", "pieniądze"],
            ["book", "książka"],
            ["street", "ulica"],
            ["city", "miasto"],
            // Day 3
            ["cat", "kot"],
            ["dog", "pies"],
            ["bird", "ptak"],
            ["fish", "ryba"],
            ["horse", "koń"],
            ["cow", "krowa"],
            ["sheep", "owca"],
            ["pig", "świnia"],
            ["chicken", "kurczak"],
            ["duck", "kaczka"],
            // Days 4-10
            ["apple", "jabłko"],
            ["banana", "banan"],
            ["orange", "pomarańcza"],
            ["grape", "winogrono"],
            ["pear", "gruszka"],
            ["peach", "brzoskwinia"],
            ["pineapple", "ananas"],
            ["strawberry", "truskawka"],
            ["melon", "melon"],
            ["lemon", "cytryna"],
            // Day 5
            ["beautiful", "piękny"],
            ["expensive", "drogi"],
            ["cheap", "tani"],
            ["left", "lewy"],
            ["right", "prawy"],
            ["here", "tutaj"],
            ["there", "tam"],
            ["today", "dzisiaj"],
            ["tomorrow", "jutro"],
            ["yesterday", "wczoraj"],
            // Day 6
            ["beer", "piwo"],
            ["wine", "wino"],
            ["hot", "gorący"],
            ["cold", "zimny"],
            ["big", "duży"],
            ["small", "mały"],
            ["good", "dobry"],
            ["bad", "zły"],
            ["new", "nowy"],
            ["old", "stary"],
            // Day 7
            ["help", "pomoc"],
            ["doctor", "lekarz"],
            ["hospital", "szpital"],
            ["bread", "chleb"],
            ["cheese", "ser"],
            ["milk", "mleko"],
            ["apple", "jabłko"],
            ["banana", "banan"],
            ["chicken", "kurczak"],
            ["fish", "ryba"],
            // Day 8
            ["book", "książka"],
            ["time", "czas"],
            ["how much", "ile"],
            ["large", "duży"],
            ["small", "mały"],
            ["woman", "kobieta"],
            ["man", "mężczyzna"],
            ["night", "noc"],
            ["morning", "rano"],
            ["bread", "chleb"],
            // Day 9
            ["hungry", "głodny"],
            ["full", "pełny"],
            ["hot", "gorący"],
            ["cold", "zimny"],
            ["open", "otwarty"],
            ["closed", "zamknięty"],
            ["yes", "tak"],
            ["no", "nie"],
            ["maybe", "może"],
            ["excuse me", "przepraszam"],
            // Day 10
            ["bathroom", "łazienka"],
            ["toilet", "toaleta"],
            ["police", "policja"],
            ["taxi", "taksówka"],
            ["train", "pociąg"],
            ["airport", "lotnisko"],
            ["beautiful", "piękny"],
            ["delicious", "pyszny"],
            ["interesting", "ciekawy"],
            ["good luck", "powodzenia"],
          ],
          french: [
            // Day 1
            ["hello", "bonjour"],
            ["goodbye", "au revoir"],
            ["please", "s’il vous plaît"],
            ["thank you", "merci"],
            ["yes", "oui"],
            ["no", "non"],
            ["sorry", "désolé"],
            ["excuse me", "excusez-moi"],
            ["bathroom", "salle de bain"],
            ["water", "eau"],
            // Day 2
            ["friend", "ami"],
            ["family", "famille"],
            ["food", "nourriture"],
            ["house", "maison"],
            ["school", "école"],
            ["car", "voiture"],
            ["money", "argent"],
            ["book", "livre"],
            ["street", "rue"],
            ["city", "ville"],
            // Day 3
            ["cat", "chat"],
            ["dog", "chien"],
            ["bird", "oiseau"],
            ["fish", "poisson"],
            ["horse", "cheval"],
            ["cow", "vache"],
            ["sheep", "mouton"],
            ["pig", "cochon"],
            ["chicken", "poulet"],
            ["duck", "canard"],
            // Days 4-10
            ["apple", "pomme"],
            ["banana", "banane"],
            ["orange", "orange"],
            ["grape", "raisin"],
            ["pear", "poire"],
            ["peach", "pêche"],
            ["pineapple", "ananas"],
            ["strawberry", "fraise"],
            ["melon", "melon"],
            ["lemon", "citron"],
            // Day 5
            ["toilet", "toilettes"],
            ["police", "police"],
            ["taxi", "taxi"],
            ["train", "train"],
            ["airport", "aéroport"],
            ["beautiful", "beau/belle"],
            ["delicious", "délicieux/délicieuse"],
            ["interesting", "intéressant/intéressante"],
            ["good luck", "bonne chance"],
            ["you’re welcome", "de rien"],
            // Day 6
            ["morning", "matin"],
            ["hungry", "faim"],
            ["full", "rassasié"],
            ["open", "ouvert"],
            ["closed", "fermé"],
            ["yes", "oui"],
            ["no", "non"],
            ["maybe", "peut-être"],
            ["excuse me", "excusez-moi"],
            ["bathroom", "salle de bain"],
            // Day 7
            ["one", "un"],
            ["two", "deux"],
            ["three", "trois"],
            ["four", "quatre"],
            ["five", "cinq"],
            ["six", "six"],
            ["seven", "sept"],
            ["eight", "huit"],
            ["nine", "neuf"],
            ["ten", "dix"],
            // Day 8
            ["beautiful", "beau/belle"],
            ["expensive", "cher"],
            ["cheap", "pas cher"],
            ["left", "gauche"],
            ["right", "droite"],
            ["here", "ici"],
            ["there", "là"],
            ["tomorrow", "demain"],
            ["yesterday", "hier"],
            ["fish", "poisson"],
            // Day 9
            ["beer", "bière"],
            ["wine", "vin"],
            ["hot", "chaud"],
            ["cold", "froid"],
            ["big", "grand"],
            ["small", "petit"],
            ["good", "bon"],
            ["bad", "mauvais"],
            ["new", "nouveau"],
            ["old", "vieux"],
            // Day 10
            ["restaurant", "restaurant"],
            ["store", "magasin"],
            ["bank", "banque"],
            ["money", "argent"],
            ["help", "aide"],
            ["doctor", "médecin"],
            ["hospital", "hôpital"],
            ["bread", "pain"],
            ["cheese", "fromage"],
            ["milk", "lait"],
          ],
          turkish: [
            // Day 1
            ["hello", "merhaba"],
            ["goodbye", "hoşçakal"],
            ["please", "lütfen"],
            ["thank you", "teşekkür ederim"],
            ["yes", "evet"],
            ["no", "hayır"],
            ["sorry", "özür dilerim"],
            ["excuse me", "affedersiniz"],
            ["bathroom", "banyo"],
            ["water", "su"],
            // Day 2
            ["friend", "arkadaş"],
            ["family", "aile"],
            ["food", "yemek"],
            ["house", "ev"],
            ["school", "okul"],
            ["car", "araba"],
            ["money", "para"],
            ["book", "kitap"],
            ["street", "sokak"],
            ["city", "şehir"],
            // Day 3
            ["cat", "kedi"],
            ["dog", "köpek"],
            ["bird", "kuş"],
            ["fish", "balık"],
            ["horse", "at"],
            ["cow", "inek"],
            ["sheep", "koyun"],
            ["pig", "domuz"],
            ["chicken", "tavuk"],
            ["duck", "ördek"],
            // Days 4-10
            ["apple", "elma"],
            ["banana", "muz"],
            ["orange", "portakal"],
            ["grape", "üzüm"],
            ["pear", "armut"],
            ["peach", "şeftali"],
            ["pineapple", "ananas"],
            ["strawberry", "çilek"],
            ["melon", "kavun"],
            ["lemon", "limon"],
            // Day 5
            ["toilet", "tuvalet"],
            ["police", "polis"],
            ["taxi", "taksi"],
            ["train", "tren"],
            ["airport", "havalimanı"],
            ["beautiful", "güzel"],
            ["delicious", "lezzetli"],
            ["interesting", "ilginç"],
            ["good luck", "iyi şanslar"],
            ["you’re welcome", "rica ederim"],
            // Day 6
            ["morning", "sabah"],
            ["hungry", "aç"],
            ["full", "tok"],
            ["open", "açık"],
            ["closed", "kapalı"],
            ["yes", "evet"],
            ["no", "hayır"],
            ["maybe", "belki"],
            ["excuse me", "pardon"],
            ["bathroom", "tuvalet"],
            // Day 7
            ["one", "bir"],
            ["two", "iki"],
            ["three", "üç"],
            ["four", "dört"],
            ["five", "beş"],
            ["six", "altı"],
            ["seven", "yedi"],
            ["eight", "sekiz"],
            ["nine", "dokuz"],
            ["ten", "on"],
            // Day 8
            ["beautiful", "güzel"],
            ["expensive", "pahalı"],
            ["cheap", "ucuz"],
            ["left", "sol"],
            ["right", "sağ"],
            ["here", "burada"],
            ["there", "orada"],
            ["today", "bugün"],
            ["tomorrow", "yarın"],
            ["yesterday", "dün"],
            // Day 9
            ["beer", "bira"],
            ["wine", "şarap"],
            ["hot", "sıcak"],
            ["cold", "soğuk"],
            ["big", "büyük"],
            ["small", "küçük"],
            ["good", "iyi"],
            ["bad", "kötü"],
            ["new", "yeni"],
            ["old", "eski"],
            // Day 10
            ["money", "para"],
            ["help", "yardım"],
            ["doctor", "doktor"],
            ["hospital", "hastane"],
            ["bread", "ekmek"],
            ["cheese", "peynir"],
            ["milk", "süt"],
            ["apple", "elma"],
            ["banana", "muz"],
            ["chicken", "tavuk"],
          ],
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
          10: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
        };
    
        const dayIndices = wordsPerDay[day];
        return dayIndices.map((index, i) => {
          const [english, translated] = words[language][index];
          return { text: `${i + 1}. ${english} - ${translated}`, translated };
        });
      }
  
    function displayWord() {
      if (currentWordIndex >= 0 && currentWordIndex < wordsList.length) {
        wordsContainer.innerText = wordsList[currentWordIndex].text;
        currentTranslatedWord = wordsList[currentWordIndex].translated;
      }
    }
  
    prevButton.addEventListener("click", function () {
      if (currentWordIndex > 0) {
        currentWordIndex--;
        displayWord();
      } else {
        alert("You are on the first word.");
      }
    });
  
    nextButton.addEventListener("click", function () {
      if (currentWordIndex < wordsList.length - 1) {
        currentWordIndex++;
        displayWord();
      } else {
        if (currentDay < 10) {
          currentDay++;
          wordsList = getWordsForDay(selectedLanguage, currentDay);
          currentWordIndex = 0;
          displayWord();
          nextButton.innerText = "Next";
          alert(
            `Congrats, you completed Day ${
              currentDay - 1
            }! Starting Day ${currentDay}`
          );
        } else {
          alert("Congrats, you completed the entire course!");
        }
      }
      if (currentWordIndex === wordsList.length - 1) {
        nextButton.innerText = `Day ${currentDay + 1}`;
      } else {
        nextButton.innerText = "Next";
      }
    });
  
    function startTimer() {
      let time = 120;
      const timer = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.innerText = `${minutes}:${
          seconds < 10 ? "0" : ""
        }${seconds}`;
        time--;
        if (time < 0) {
          clearInterval(timer);
          alert("Congrats, you completed today's lesson!");
        }
      }, 1000);
    }
  
    function getLanguageCode(language) {
      switch (language) {
        case "spanish":
          return "es-ES";
        case "russian":
          return "ru-RU";
        case "polish":
          return "pl-PL";
        case "french":
          return "fr-FR";
        case "turkish":
          return "tr-TR";
        default:
          return "en-US";
      }
    }
  });
  