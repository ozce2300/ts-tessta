const e=document.getElementById("tabort"),t=document.getElementById("output");function n(){localStorage.clear(),t&&(t.innerHTML="")}document.addEventListener("DOMContentLoaded",function(){let l=document.getElementById("submit"),o=0;l.addEventListener("click",function(e){e.preventDefault();let n=document.getElementById("kurskod"),l=document.getElementById("kursnamn"),c=document.getElementById("a"),a=document.getElementById("b"),d=document.getElementById("c"),i=document.getElementById("lank"),r=n.value,u={code:r,name:l.value,progression:c.checked?"A":a.checked?"B":d.checked?"C":"Ej valt progression",syllabus:i.value},s=document.createElement("ul");s.innerHTML+=`
        <li>Kurskod: ${u.code}</li>
        <li>Kursnamn: ${u.name}</li>
        <li>Progression: ${u.progression}</li>
        <li>L\xe4nk: <a href="${u.syllabus}"> L\xe4nk</a></li>
        `,t&&t.appendChild(s),function(e,t){let n=`course_${t}`;localStorage.setItem(n,JSON.stringify(e))}(u,o),o++,n.value="",l.value="",c.checked=!1,a.checked=!1,d.checked=!1,i.value=""}),e.addEventListener("click",n),function(){for(let e=0;e<localStorage.length;e++){let n=localStorage.key(e);if(n&&n.startsWith("course_")){let e=JSON.parse(localStorage.getItem(n)),l=document.createElement("ul");l.innerHTML+=`
            <li>Kurskod: ${e.code}</li>
            <li>Kursnamn: ${e.name}</li>
            <li>Progression: ${e.progression}</li>
            <li><a href="${e.syllabus}">L\xe4nk</a></li>
            `,t&&t.appendChild(l)}}}()});
//# sourceMappingURL=index.d99f46b5.js.map
