"use strict";

const taBortEl = document.getElementById("tabort") as HTMLButtonElement;
const outputDiv = document.getElementById("output");

interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

let currentUpdateIndex: string | null = null;

document.addEventListener("DOMContentLoaded", function() {
    const sparaEl = document.getElementById("submit") as HTMLButtonElement;
    let courseCount = localStorage.length; // Räknare för att hålla koll på antalet sparade kurser

    sparaEl.addEventListener("click", function(event) {
        event.preventDefault();

        const kursInfo = getFormData();
        if (kursInfo) {
            if (currentUpdateIndex !== null) {
                // Uppdatera befintlig kurs
                updateCourseInfo(kursInfo, currentUpdateIndex);
                currentUpdateIndex = null;
            } else {
                // Lägg till ny kurs
                storeCourseInfo(kursInfo, courseCount);
                courseCount++;
            }
            resetForm();
            refreshOutput();
        }
    });

    // Lägg till händelselyssnare för att rensa lagringen
    taBortEl.addEventListener("click", clearStorage);

    // Ladda tidigare sparad kursinfo när sidan laddas
    loadData();
});

function getFormData(): CourseInfo | null {
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

    if (kurskod && kursnamn && lank) {
        return {
            code: kurskod,
            name: kursnamn,
            progression: valtAlternativ,
            syllabus: lank
        };
    }
    return null;
}

function storeCourseInfo(courseInfo: CourseInfo, count: number) {
    const key = `course_${count}`;
    localStorage.setItem(key, JSON.stringify(courseInfo));
}

function updateCourseInfo(courseInfo: CourseInfo, index: string) {
    localStorage.setItem(index, JSON.stringify(courseInfo));
}

function loadData() {
    if (outputDiv) {
        outputDiv.innerHTML = "";
    }
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("course_")) {
            const courseInfo: CourseInfo = JSON.parse(localStorage.getItem(key)!);
            addCourseToOutput(courseInfo, key);
        }
    }
}

function clearStorage() {
    localStorage.clear();
    if (outputDiv) {
        outputDiv.innerHTML = "";
    }
}

function resetForm() {
    const kurskodEl = document.getElementById("kurskod") as HTMLInputElement;
    const kursnamnEl = document.getElementById("kursnamn") as HTMLInputElement;
    const aEl = document.getElementById("a") as HTMLInputElement;
    const bEl = document.getElementById("b") as HTMLInputElement;
    const cEl = document.getElementById("c") as HTMLInputElement;
    const lankEl = document.getElementById("lank") as HTMLInputElement;

    kurskodEl.value = "";
    kursnamnEl.value = "";
    aEl.checked = false;
    bEl.checked = false;
    cEl.checked = false;
    lankEl.value = "";
}

function refreshOutput() {
    loadData();
}

function addCourseToOutput(courseInfo: CourseInfo, key: string) {
    const kursInfoElement = document.createElement("ul");

    kursInfoElement.innerHTML = `
        <li>Kurskod: ${courseInfo.code}</li>
        <li>Kursnamn: ${courseInfo.name}</li>
        <li>Progression: ${courseInfo.progression}</li>
        <li><a href="${courseInfo.syllabus}">Länk</a></li>
    `;

    const updateButton = document.createElement("button");
    updateButton.textContent = "Uppdatera";
    updateButton.addEventListener("click", function() {
        populateFormForUpdate(courseInfo, key);
    });

    kursInfoElement.appendChild(updateButton);

    if (outputDiv) {
        outputDiv.appendChild(kursInfoElement);
    }
}

function populateFormForUpdate(courseInfo: CourseInfo, key: string) {
    const kurskodEl = document.getElementById("kurskod") as HTMLInputElement;
    const kursnamnEl = document.getElementById("kursnamn") as HTMLInputElement;
    const aEl = document.getElementById("a") as HTMLInputElement;
    const bEl = document.getElementById("b") as HTMLInputElement;
    const cEl = document.getElementById("c") as HTMLInputElement;
    const lankEl = document.getElementById("lank") as HTMLInputElement;

    kurskodEl.value = courseInfo.code;
    kursnamnEl.value = courseInfo.name;
    if (courseInfo.progression === "A") {
        aEl.checked = true;
    } else if (courseInfo.progression === "B") {
        bEl.checked = true;
    } else if (courseInfo.progression === "C") {
        cEl.checked = true;
    }
    lankEl.value = courseInfo.syllabus;

    currentUpdateIndex = key;
}
