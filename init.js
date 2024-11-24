const firstNameOutput = document.querySelector('#firstNameOutput');
const surnameOutput = document.querySelector('#surnameOutput');
const genderOutput = document.querySelector('#genderOutput');
const birthYearOutput = document.querySelector('#birthYearOutput');
const patronymicOutput = document.querySelector('#patronymic');
const professionOutput = document.querySelector('#profession');

window.addEventListener('DOMContentLoaded', generate);
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#generate').addEventListener('click', generate);

function clear() {
    [firstNameOutput, surnameOutput, genderOutput, birthYearOutput, patronymicOutput, professionOutput].forEach(output => {
        output.innerText = '';
    });
}

function generate() {
    const { firstName, surname, gender, birthYear, patronymic, profession } = personGenerator.getPerson();
    firstNameOutput.innerText = firstName;
    surnameOutput.innerText = surname;
    genderOutput.innerText = gender;
    birthYearOutput.innerText = birthYear;
    patronymicOutput.innerText = patronymic;
    professionOutput.innerText = profession;
}