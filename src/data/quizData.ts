import { QuizQuestion } from '../types/chronicle';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    landmarkId: 'bogatyr-mine',
    questionKk: '«Богатырь» көмір кеніші 1985 жылы қандай тарихи көрсеткішпен Гиннесстің рекордтар кітабына енгізілді?',
    questionRu: 'С каким историческим показателем угольный разрез «Богатырь» вошел в Книгу рекордов Гиннесса в 1985 году?',
    questionEn: 'With what historical metric did the Bogatyr coal mine enter the Guinness Book of Records in 1985?',
    optionsKk: [
      'Жылына 25 млн тонна өндірумен',
      'Бір жылда 56,8 миллион тонна көмір өндірумен',
      'Ең терең шахта қазуымен',
      'Ең ұзын конвейер жасауымен'
    ],
    optionsRu: [
      'Добыча 25 млн тонн в год',
      'Добыча 56,8 миллиона тонн угля за один год',
      'Самая глубокая шахта',
      'Самый длинный конвейер'
    ],
    optionsEn: [
      '25 million tons annual output',
      '56.8 million tons of coal mined in a single year',
      'Deepest mine shaft',
      'Longest conveyor system'
    ],
    correctIndex: 1,
    explanationKk: '1985 жылы «Богатырь» кеніші 56,8 миллион тонна көмір өндіріп, әлемдегі бір кәсіпорынның бір жылдық өндірісі бойынша абсолютті әлемдік рекорд орнатты.',
    explanationRu: 'В 1985 году разрез «Богатырь» добыл 56,8 млн тонн угля, что стало абсолютным мировым рекордом для одного предприятия.',
    explanationEn: 'In 1985, the Bogatyr mine extracted 56.8 million tons of coal, setting the all-time world record for a single facility.',
    funFactKk: 'Бұл кеніштен алынған көмір Қазақстанның электр станцияларының 70%-дан астамын отынмен қамтып отыр.'
  },
  {
    id: 2,
    landmarkId: 'gres-stations',
    questionKk: 'Екібастұз ГРЭС-2 станциясының әлемге әйгілі түтін мұржасының биіктігі қанша метр?',
    questionRu: 'Какова высота всемирно известной дымовой трубы Экибастузской ГРЭС-2?',
    questionEn: 'What is the height of the world-famous chimney at the Ekibastuz GRES-2 power station?',
    optionsKk: [
      '300 метр',
      '380,5 метр',
      '419,7 метр',
      '500 метр'
    ],
    optionsRu: [
      '300 метров',
      '380,5 метров',
      '419,7 метра',
      '500 метров'
    ],
    optionsEn: [
      '300 meters',
      '380.5 meters',
      '419.7 meters',
      '500 meters'
    ],
    correctIndex: 2,
    explanationKk: 'ГРЭС-2 мұржасының биіктігі — 419,7 метр. Ол Гиннесс рекордтар кітабына жер бетіндегі ең биік өндірістік түтін мұржасы ретінде ресми тіркелген (Эйфель мұнарасынан да биік!).',
    explanationRu: 'Высота трубы ГРЭС-2 составляет 419,7 метра. Она занесена в Книгу рекордов Гиннесса как высочайшая дымовая труба в мире.',
    explanationEn: 'The GRES-2 chimney stands at 419.7 meters tall, officially recognized by Guinness as the world\'s tallest chimney (taller than Paris\'s Eiffel Tower).',
    funFactKk: 'Бұл алып мұржаның темірбетон салмағы 60 000 тоннадан асады және 8 балдық зілзалаға шыдайды.'
  },
  {
    id: 3,
    landmarkId: 'pshembayev-monument',
    questionKk: '1886 жылы Қосым Пішенбаев көмір тапқан жерін белгілеу үшін не қойып кетті?',
    questionRu: 'Что оставил Косым Пшембаев в 1886 году, чтобы обозначить место находки угля?',
    questionEn: 'What did Kosym Pshembayev leave behind in 1886 to mark the coal deposit coordinates?',
    optionsKk: [
      'Қызыл жалауша',
      'Екі бас үлкен тас тұз',
      'Темір қазық',
      'Ағаш крест'
    ],
    optionsRu: [
      'Красный флажок',
      'Две большие глыбы каменной соли',
      'Железный колышек',
      'Деревянный крест'
    ],
    optionsEn: [
      'A red flag',
      'Two large blocks of rock salt',
      'An iron stake',
      'A wooden cross'
    ],
    correctIndex: 1,
    explanationKk: 'Қосым Пішенбаев табылған орынға көрші тұзды көлден екі бас тас тұз қойып кеткен. Содан «Екі бас тұз қойылған төбе» атанып, қаланың болашақ «Екібастұз» атауы осыдан туған.',
    explanationRu: 'Косым Пшембаев водрузил две глыбы соли («екі бас тұз») на холм. Это урочище дало название будущему городу Экибастуз.',
    explanationEn: 'Kosym Pshembayev brought two big blocks of rock salt ("eki bas tuz") to mark the spot, creating the historical toponym of the city.',
    funFactKk: 'Қосым Пішенбаев Екібастұздан бөлек Майқайың алтын кенішін де алғаш ашқан.'
  },
  {
    id: 4,
    landmarkId: 'shakhter-palace',
    questionKk: 'Екібастұздың классикалық бағаналары бар бас мәдениет ордасы — «Шахтер» сарайы қай жылы ашылды?',
    questionRu: 'В каком году распахнул свои двери Дворец культуры «Шахтер» с классической колоннадой?',
    questionEn: 'In what year was the "Shakhter" Palace of Culture opened to the public?',
    optionsKk: [
      '1899 жылы',
      '1945 жылы',
      '1957 жылы',
      '1975 жылы'
    ],
    optionsRu: [
      'В 1899 году',
      'В 1945 году',
      'В 1957 году',
      'В 1975 году'
    ],
    optionsEn: [
      'In 1899',
      'In 1945',
      'In 1957',
      'In 1975'
    ],
    correctIndex: 2,
    explanationKk: '«Шахтер» мәдениет сарайы 1957 жылы — Екібастұзға қала мәртебесі берілген тарихи жылы ашылды.',
    explanationRu: 'ДК «Шахтер» был открыт в 1957 году — в тот же знаменательный год, когда рабочий поселок получил статус города.',
    explanationEn: '"Shakhter" Palace opened in 1957, the landmark year when Ekibastuz attained its city status.',
    funFactKk: 'Ғимараттың кіреберіс қасбетінде 8 монументалды антикалық стильдегі бағаналар орналасқан.'
  },
  {
    id: 5,
    landmarkId: 'museum-lore',
    questionKk: 'Екібастұз тарих және өлкетану мұражайының қорында қаншадан астам құнды жәдігер сақтаулы?',
    questionRu: 'Сколько единиц хранения насчитывают фонды Экибастузского историко-краеведческого музея?',
    questionEn: 'How many historical items are preserved in the Ekibastuz Local Lore Museum?',
    optionsKk: [
      '1 000-ға жуық',
      '5 000 жәдігер',
      '30 000-нан астам',
      '100 000 жәдігер'
    ],
    optionsRu: [
      'Около 1 000',
      '5 000 экспонатов',
      'Более 30 000',
      '100 000 экспонатов'
    ],
    optionsEn: [
      'About 1,000',
      '5,000 exhibits',
      'Over 30,000',
      '100,000 exhibits'
    ],
    correctIndex: 2,
    explanationKk: '1987 жылы ашылған мұражай қорында палеонтология, археология, этнография және көмір өндірісі тарихын қамтитын 30 мыңнан астам жәдігер бар.',
    explanationRu: 'В фондах музея хранится более 30 000 экспонатов, отражающих палеонтологию, этнографию и летопись угольного бассейна.',
    explanationEn: 'The museum holds over 30,000 cataloged exhibits ranging from ancient fossils to mining equipment.',
    funFactKk: 'Мұражайда көмір карьерлерінен табылған ежелгі мамонт сүйектері мен 300 млн жылдық өсімдік іздері сақталған.'
  },
  {
    id: 6,
    landmarkId: 'city-history-monuments',
    questionKk: 'Екібастұзға облыстық бағыныстағы ҚАЛА мәртебесі ресми түрде қай күні берілді?',
    questionRu: 'В какой день рабочий поселок Экибастуз официально получил статус ГОРОДА?',
    questionEn: 'On what date was Ekibastuz officially granted CITY status?',
    optionsKk: [
      '1899 жыл 1 қаңтар',
      '1957 жыл 12 маусым',
      '1970 жыл 7 қараша',
      '1991 жыл 16 желтоқсан'
    ],
    optionsRu: [
      '1 января 1899 года',
      '12 июня 1957 года',
      '7 ноября 1970 года',
      '16 декабря 1991 года'
    ],
    optionsEn: [
      'January 1, 1899',
      'June 12, 1957',
      'November 7, 1970',
      'December 16, 1991'
    ],
    correctIndex: 1,
    explanationKk: '1957 жылғы 12 маусымда Қазақ КСР Жоғарғы Кеңесінің Жарлығымен Екібастұз қала мәртебесіне ие болды.',
    explanationRu: '12 июня 1957 года Указом Президиума Верховного Совета КазССР Экибастуз стал городом областного подчинения.',
    explanationEn: 'On June 12, 1957, the Supreme Soviet decreed Ekibastuz an official regional municipality.',
    funFactKk: 'Дәл осы күні қалада жыл сайын қала тұрғындарының сүйікті мерекесі — Қала күні тойланады.'
  },
  {
    id: 7,
    landmarkId: 'miners-glory-alley',
    questionKk: '«Кеншілер даңқы» аллеясында ашық аспан астында қандай шынайы ауыр техника жәдігері орнатылған?',
    questionRu: 'Какой подлинный экспонат тяжелой горной техники установлен на аллее «Слава горнякам»?',
    questionEn: 'What authentic piece of heavy quarry machinery is installed on Miners\' Glory Alley?',
    optionsKk: [
      'Алып роторлы экскаватордың нағыз болат шөміші мен БелАЗ доңғалағы',
      'Әскери танк',
      'Ғарыш зымыранының бөлшегі',
      'Суасты қайығының пропеллері'
    ],
    optionsRu: [
      'Подлинный стальной ковш роторного экскаватора и колесо БелАЗа',
      'Военный танк',
      'Фрагмент космической ракеты',
      'Винт подводной лодки'
    ],
    optionsEn: [
      'Real steel rotary excavator bucket and giant BelAZ truck wheel',
      'Military tank',
      'Space rocket component',
      'Submarine propeller'
    ],
    correctIndex: 0,
    explanationKk: '«Кеншілер даңқы» аллеясында разрездерде ұзақ жылдар қызмет еткен роторлы экскаватордың алып болат шөміші, адам бойынан биік БелАЗ дөңгелегі және вагонеткалар қойылған.',
    explanationRu: 'На аллее экспонируются настоящий роторный ковш, гигантская шина карьерного БелАЗа и шахтерская вагонетка.',
    explanationEn: 'The alley features an authentic multi-ton rotary excavator bucket, a quarry dump truck tire, and historic mine cars.',
    funFactKk: 'Бұл шөміш бір салғанда бірнеше тонна тау жынысын қопарып алатын құдіретке ие болған.'
  },
  {
    id: 8,
    landmarkId: 'bukhar-zhyrau-library',
    questionKk: 'Екібастұздың орталық қалалық кітапханасы қай ұлы қазақ ойшылы мен жырауының есімімен аталады?',
    questionRu: 'Имя какого великого казахского мыслителя и поэта носит Центральная городская библиотека?',
    questionEn: 'Which legendary Kazakh philosopher and bard does the Central City Library bear the name of?',
    optionsKk: [
      'Абай Құнанбайұлы',
      'Шоқан Уәлиханов',
      'Бұқар жырау Қалқаманұлы',
      'Жамбыл Жабаев'
    ],
    optionsRu: [
      'Абай Кунанбаев',
      'Чокан Валиханов',
      'Бухар жырау Калкаманулы',
      'Джамбул Джабаев'
    ],
    optionsEn: [
      'Abai Qunanbaiuly',
      'Shoqan Walikhanov',
      'Bukhar Zhyrau Qalqamanuly',
      'Zhambyl Zhabayev'
    ],
    correctIndex: 2,
    explanationKk: 'Кітапханаға 1993 жылы қазақтың ұлы ойшылы, мемлекет қайраткері, Абылай ханның бас кеңесшісі Бұқар жыраудың 325 жылдығы құрметіне оның есімі берілді.',
    explanationRu: 'В 1993 году к 325-летию мудреца и советника хана Абылая библиотеке было присвоено имя Бухар жырау.',
    explanationEn: 'In 1993, the library was named after Bukhar Zhyrau, the supreme 18th-century advisor to Ablai Khan.',
    funFactKk: 'Кітапхана қорында 150 000-нан астам кітап және 1954 жылдан бергі жергілікті газеттердің толық мұрағаты бар.'
  },
  {
    id: 9,
    landmarkId: 'ekibastuz-park',
    questionKk: 'Екібастұз қалалық саябағының бүкіл қала мен кеніштерді биіктен көруге мүмкіндік беретін басты символы қандай?',
    questionRu: 'Какой аттракцион является главным символом парка, позволяя увидеть панораму города и разрезов?',
    questionEn: 'Which iconic attraction in the City Park offers panoramic views of the city skyline and coal cuts?',
    optionsKk: [
      'Шолу дөңгелегі (Колесо обозрения)',
      'Американдық сырғанақтар',
      'Су бассейні',
      'Аспалы арқан жолы'
    ],
    optionsRu: [
      'Колесо обозрения',
      'Американские горки',
      'Плавательный бассейн',
      'Канатная дорога'
    ],
    optionsEn: [
      'Ferris wheel (Giant Observation Wheel)',
      'Roller coaster',
      'Swimming pool',
      'Cable car'
    ],
    correctIndex: 0,
    explanationKk: 'Қалалық саябақтың биік шолу дөңгелегінен бүкіл Екібастұздың жасыл көшелері мен алыстағы «Богатырь» кеніші мен ГРЭС мұржалары алақандағыдай көрінеді.',
    explanationRu: 'С колеса обозрения открывается круговой обзор на весь зеленый массив города и величественные силуэты промышленных гигантов.',
    explanationEn: 'The iconic Ferris wheel provides a breathtaking bird\'s-eye panorama across city avenues and distant mining horizons.',
    funFactKk: 'Қатал қуаң далада орналасқан бұл саябақты кеншілер мен жастар өз қолдарымен ағаш егіп өсірген.'
  },
  {
    id: 10,
    landmarkId: 'voskresenka-railway',
    questionKk: '1899 жылы салынған Екібастұз — Воскресенка тарихи теміржолының ұзындығы қанша шақырым болды?',
    questionRu: 'Какова была протяженность исторической железной дороги Экибастуз — Воскресенка, построенной в 1899 году?',
    questionEn: 'What was the length of the historic Ekibastuz — Voskresenka railway built in 1899?',
    optionsKk: [
      '25 шақырым',
      '50 шақырым',
      '116 шақырым',
      '300 шақырым'
    ],
    optionsRu: [
      '25 километров',
      '50 километров',
      '116 километров',
      '300 километров'
    ],
    optionsEn: [
      '25 kilometers',
      '50 kilometers',
      '116 kilometers',
      '300 kilometers'
    ],
    correctIndex: 2,
    explanationKk: '1899 жылы салынған 116 шақырымдық теміржол Екібастұз көмірін Ертіс өзеніндегі Воскресенск айлағына (қазіргі Ақсу қаласы) жеткізіп, пароходтармен тасымалдауға мүмкіндік берді.',
    explanationRu: '116-километровая железная дорога связала угольные разрезы с пристанью на Иртыше, дав старт масштабным поставкам угля.',
    explanationEn: 'The 116-kilometer line carried coal to steam barges on the Irtysh river at Voskresenka (now Aksu).',
    funFactKk: 'Бүгінде Екібастұз теміржол бекеті алаңында 1899 жылғы тұңғыш теміржолшыларға арналған тарихи паровоз ескерткіші тұр.'
  }
];
