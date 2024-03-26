"use strict";

interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

document.addEventListener("DOMContentLoaded", function() {
    const kurskodEl = document.getElementById("kurskod") as HTMLInputElement;
    const kursnamnEl = document.getElementById("kursnamn") as HTMLInputElement;
    const aEl = document.getElementById("a") as HTMLInputElement;
    const bEl = document.getElementById("b") as HTMLInputElement;
    const cEl = document.getElementById("c") as HTMLInputElement;
    const lankEl = document.getElementById("lank") as HTMLInputElement;
    const sparaEl = document.getElementById("submit") as HTMLButtonElement;
    const outputDiv = document.getElementById("output");

    sparaEl.addEventListener("click", function(event) {
        event.preventDefault();

        const kurskod = kurskodEl.value;
        const kursnamn = kursnamnEl.value;
        const valtAlternativ = aEl.checked ? "A" : bEl.checked ? "B" : cEl.checked ? "C" : "Ej valt progression";
        const lank = lankEl.value;

        const kursInfo: CourseInfo = {
            code: kurskod,
            name: kursnamn,
            progression: valtAlternativ,
            syllabus: lank
        };

const kursInfoElement = document.createElement("ul");

kursInfoElement.innerHTML += `
<li>Kurskod: ${kursInfo.code}</li>
<li>Kursnamn: ${kursInfo.name}</li>
<li>Progression: ${kursInfo.progression}</li>
<li>Länk: <a href="${kursInfo.syllabus}"> Länk</a></li>

`;

if (outputDiv) {
    outputDiv.appendChild(kursInfoElement);
}

        // Återställ formuläret
        kurskodEl.value = "";
        kursnamnEl.value = "";
        aEl.checked = false;
        bEl.checked = false;
        cEl.checked = false;
        lankEl.value = "";
    });
});