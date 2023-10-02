const id = document.getElementById("id");
const names = document.getElementById("name");
const math = document.getElementById("math");
const physics = document.getElementById("physics");
const prog = document.getElementById("prog");
const btn = document.querySelector(".btn");
const tBody = document.querySelector(".body");
const res = document.querySelector(".results");

const studentRow = new Array();

class Student {
    constructor(id, name, math, physics, prog) {
        this.id = id;
        this.name = name;
        this.math = math;
        this.physics = physics;
        this.prog = prog;
    }
};

let passedOne = 0;
let passedTwo = 0;
let passedAll = 0;

btn.addEventListener("click", () => {
    if(id !== "" && names !== "" && math !== "" && physics !== "" && prog !== "") {
        const newStudent = new Student(parseInt(id.value), names.value, parseFloat(math.value), parseFloat(physics.value), parseFloat(prog.value));
        
        if((newStudent.math >= 0 && newStudent.math <= 20) && (newStudent.physics >= 0 && newStudent.physics <= 20) && 
        (newStudent.prog >= 0 && newStudent.prog <= 20)) {
            if(newStudent.math > 9.4 && newStudent.physics > 9.4 && newStudent.prog > 9.4) passedAll++;
            else if((newStudent.math > 9.4 && newStudent.physics > 9.4 && newStudent.prog <= 9.4) || 
            (newStudent.math > 9.4 && newStudent.physics <= 9.4 && newStudent.prog > 9.4) || 
            (newStudent.math <= 9.4 && newStudent.physics > 9.4 && newStudent.prog > 9.4)) passedTwo++;
            else if((newStudent.math <= 9.4 && newStudent.physics > 9.4 && newStudent.prog <= 9.4) || 
            (newStudent.math > 9.4 && newStudent.physics <= 9.4 && newStudent.prog <= 9.4) || 
            (newStudent.math <= 9.4 && newStudent.physics <= 9.4 && newStudent.prog > 9.4)) passedOne++;
            
            studentRow.push(newStudent);

            const newRow = tBody.insertRow();
            for(value of Object.values(newStudent)) {
                const newCell = newRow.insertCell();
                const newText = document.createTextNode(value);
                newCell.appendChild(newText);
            }

            res.innerHTML = `<p>Promedio de Matematicas: ${studentRow.map((student) => student.math)
            .reduce((previous, current) => previous + current, 0)/studentRow.length}</p>
            <p>Promedio de Fisica: ${studentRow.map((student) => student.physics)
            .reduce((previous, current) => previous + current, 0)/studentRow.length}</p>
            <p>Promedio de Matematicas: ${studentRow.map((student) => student.prog)
            .reduce((previous, current) => previous + current, 0)/studentRow.length}</p>
            <p>Aprobados en Matematicas: ${studentRow.filter((student) => student.math > 9.4).length}</p>
            <p>Aprobados en Fisica: ${studentRow.filter((student) => student.physics > 9.4).length}</p>
            <p>Aprobados en Programacion: ${studentRow.filter((student) => student.prog > 9.4).length}</p>
            <p>Reprobados en Matematicas: ${studentRow.filter((student) => student.math <= 9.4).length}</p>
            <p>Reprobados en Fisica: ${studentRow.filter((student) => student.physics <= 9.4).length}</p>
            <p>Reprobados en Programacion: ${studentRow.filter((student) => student.prog <= 9.4).length}</p>
            <p>Numero de alumnos que aprobaron todas las materias: ${passedAll}</p>
            <p>Numero de alumnos que aprobaron dos materias: ${passedTwo}</p>
            <p>Numero de alumnos que aprobaron una materia: ${passedOne}</p>
            <p>Nota maxima de Matematicas: ${Math.max(...studentRow.map((student) => student.math))}</p>
            <p>Nota maxima de Fisica: ${Math.max(...studentRow.map((student) => student.physics))}</p>
            <p>Nota maxima de Programacion: ${Math.max(...studentRow.map((student) => student.prog))}</p>`
        } else {
            alert("Solo se aceptan notas entre 0 y 20.");
        }
        
    } else {
        alert("No se permiten campos vacios.");
    }
})


