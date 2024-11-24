const personGenerator = {
    surnameJson: `{  
        "count": 15,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Марина",
            "id_3": "Инна",
            "id_4": "Анастасия",
            "id_5": "Дарья",
            "id_6": "Надежда",
            "id_7": "Мария",
            "id_8": "Диана",
            "id_9": "Екатерина",
            "id_10": "Анна"
        }
    }`,
    professionMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Начальник",
            "id_2": "Коммерсант",
            "id_3": "Водитель",
            "id_4": "Слесарь",
            "id_5": "Токарь",
            "id_6": "Каменщик",
            "id_7": "Грузчик",
            "id_8": "Военнослужащий",
            "id_9": "Сварщик",
            "id_10": "Электрик"
        }
    }`,
    professionFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Учитель",
            "id_2": "Бухгалтер",
            "id_3": "Уборщица",
            "id_4": "Ученый",
            "id_5": "Библиотекарь",
            "id_6": "Швея",
            "id_7": "Продавец",
            "id_8": "Диспетчер",
            "id_9": "Секретарь",
            "id_10": "Оператор ЭВМ"            
        }
    }`,
   

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomFirstName: function() {
        if (this.person.gender ==='Мужчина'){
            return this.randomValue(this.firstNameMaleJson);
        } else {
            return this.randomValue(this.firstNameFemaleJson)
        };
    },


     randomSurname: function() {
        if (this.person.gender === 'Мужчина') {
            return this.randomValue(this.surnameJson);
        } else { 
            return this.randomValue(this.surnameJson)+ 'a';
        };

    },

    randomPatronymic: function () {
        let patronymic = '';
        const name = this.randomValue(this.firstNameMaleJson);
        const genderEnding = (this.person.gender === "Мужчина") ? 2 : 3;

        const addEnding = (name, ending) => name + ending;
        const replaceEnding = (name, ending, regExp) => name.replace(regExp, ending);

        const endings = [
            [/[бвгдзклмнпрстфх]$/, addEnding, 'ович', 'овна'], //[Александр] + [ович|овна] (Александр, Максим, Иван, Артем, Михаил, Даниил, Егор)
            [/й$/, replaceEnding, 'евич', 'евна'], //Дмитри[-й] + [евич|евна] (Дмитрий, Андрей)
            [/[ауы]$/, replaceEnding, 'ич', 'ична'], //Никит[-а] + [ич|ична] (Никита)
        ];
        for (let i = 0; i < endings.length; i++) {
            if (endings[i][0].test(name)) {    
                let ending = endings[i][genderEnding]; 
                let regExp = endings[i][0];
                patronymic = endings[i][1](name, ending, regExp);
                break; 
            };
        }

        return patronymic;
    },

    randomProfession: function () {
        if (this.person.gender === 'Мужчина') {
            return this.randomValue(this.professionMaleJson);
        } else {
            return this.randomValue(this.professionFemaleJson);
        };
    },

    randomGender: function () {
        return (this.randomIntNumber()) ? this.GENDER_MALE : this.GENDER_FEMALE;
    },
    randomBirthYear: function () {
        const year = this.randomIntNumber(2024, 1941);
        const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const monthIndex = this.randomIntNumber(11, 0);
        const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const day = this.randomIntNumber(daysInMonth[monthIndex], 1);
    
        return `${day} ${monthNames[monthIndex]} ${year}`;
    },

    getPerson: function () {
            this.person = {};
            this.person.gender = this.randomGender();
            this.person.firstName = this.randomFirstName();
            this.person.surname = this.randomSurname();
            this.person.birthYear = this.randomBirthYear();
            this.person.patronymic = this.randomPatronymic();
            this.person.profession = this.randomProfession();
            return this.person;
    }
};
