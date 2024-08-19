"use strict";

const taBortEl = document.getElementById("tabort") as HTMLButtonElement;
const outputDiv = document.getElementById("output") as HTMLDivElement | null;

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
                // Kontrollera om kurskoden redan finns
                if (isCourseCodeDuplicate(kursInfo.code)) {
                    const errorElement = document.getElementById('error');
                    if (errorElement) {
                        errorElement.innerHTML = "<p>Kurskoden finns redan</p>";
                    }
                    return; // Avbryt vidare åtgärder
                }
                // Lägg till ny kurs
                storeCourseInfo(kursInfo, courseCount);
                courseCount++;
            }
            resetForm();
            refreshOutput();
        }
    });

    // Lägg till händelselyssnare för att rensa lagringen
    if (taBortEl) {
        taBortEl.addEventListener("click", clearStorage);
    }

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
            const courseInfo = JSON.parse(localStorage.getItem(key)!) as CourseInfo;
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

    if (kurskodEl) kurskodEl.value = "";
    if (kursnamnEl) kursnamnEl.value = "";
    if (aEl) aEl.checked = false;
    if (bEl) bEl.checked = false;
    if (cEl) cEl.checked = false;
    if (lankEl) lankEl.value = "";
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

    if (kurskodEl) kurskodEl.value = courseInfo.code;
    if (kursnamnEl) kursnamnEl.value = courseInfo.name;
    if (aEl) aEl.checked = courseInfo.progression === "A";
    if (bEl) bEl.checked = courseInfo.progression === "B";
    if (cEl) cEl.checked = courseInfo.progression === "C";
    if (lankEl) lankEl.value = courseInfo.syllabus;

    currentUpdateIndex = key;
}

function isCourseCodeDuplicate(code: string): boolean {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("course_")) {
            const courseInfo = JSON.parse(localStorage.getItem(key)!) as CourseInfo;
            if (courseInfo.code === code) {
                return true; // Kurskoden finns redan
            }
        }
    }
    return false; // Kurskoden finns inte
}
