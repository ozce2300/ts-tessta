/**
 * Author: Özgür Celik
 * Email: ozce2300@student.miun.se
*/

"use strict";

const taBortEl = document.getElementById("tabort") as HTMLButtonElement;
const outputDiv = document.getElementById("output");

interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

document.addEventListener("DOMContentLoaded", function() {
    const sparaEl = document.getElementById("submit") as HTMLButtonElement;
    let courseCount = 0; // Räknare för att hålla koll på antalet sparade kurser

    sparaEl.addEventListener("click", function(event) {
        event.preventDefault();

        const kurskodEl = document.getElementById("kurskod") as HTMLInputElement;
        const kursnamnEl = document.getElementById("kursnamn") as HTMLInputElement;
        const aEl = document.getElementById("a") as HTMLInputElement;
        const bEl = document.getElementById("b") as HTMLInputElement;
        const cEl = document.getElementById("c") as HTMLInputElement;
        const lankEl = document.getElementById("lank") as HTMLInputElement;

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

        // Spara kursinfo i localStorage med unik nyckel
        storeCourseInfo(kursInfo, courseCount);

        // Öka räknaren för nästa kurs
        courseCount++;

        // Återställ formuläret
        kurskodEl.value = "";
        kursnamnEl.value = "";
        aEl.checked = false;
        bEl.checked = false;
        cEl.checked = false;
        lankEl.value = "";
    });

    // Lägg till händelselyssnare för att rensa lagringen
    taBortEl.addEventListener("click", clearStorage);

    // Ladda tidigare sparad kursinfo när sidan laddas
    loadData();
});

function storeCourseInfo(courseInfo: CourseInfo, count: number) {
    const key = `course_${count}`;
    localStorage.setItem(key, JSON.stringify(courseInfo));
}

function loadData() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("course_")) {
            const courseInfo: CourseInfo = JSON.parse(localStorage.getItem(key)!);
            const kursInfoElement = document.createElement("ul");
            kursInfoElement.innerHTML += `
            <li>Kurskod: ${courseInfo.code}</li>
            <li>Kursnamn: ${courseInfo.name}</li>
            <li>Progression: ${courseInfo.progression}</li>
            <li><a href="${courseInfo.syllabus}">Länk</a></li>
            `;
            if (outputDiv) {
                outputDiv.appendChild(kursInfoElement);
            }
        }
    }
}

function clearStorage() {
    localStorage.clear();
    if (outputDiv) {
        outputDiv.innerHTML = "";
    }
}
