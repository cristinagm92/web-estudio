const menu = document.getElementById("menu");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

const subjects = document.getElementById("subjects");
const pregunta = document.getElementById("pregunta");
const respuestas = document.getElementById("respuestas");
const progreso = document.getElementById("progreso");
const tituloAsignatura = document.getElementById("tituloAsignatura");

const btnSiguiente = document.getElementById("btnSiguiente");

let preguntasActuales = [];
let indice = 0;
let aciertos = 0;
let errores = [];

function mezclar(array){
    return [...array].sort(()=>Math.random()-0.5);
}

Object.keys(asignaturas).forEach(nombre=>{

    const btn = document.createElement("button");

    btn.className="subject-btn";

    btn.textContent=nombre;

    btn.onclick=()=>iniciarTest(nombre);

    subjects.appendChild(btn);

});

function iniciarTest(asignatura){

    preguntasActuales=mezclar(asignaturas[asignatura]);

    indice=0;
    aciertos=0;
    errores=[];

    tituloAsignatura.textContent=asignatura;

    menu.classList.add("hidden");
    resultado.classList.add("hidden");
    quiz.classList.remove("hidden");

    cargarPregunta();
}

function cargarPregunta(){

    btnSiguiente.classList.add("hidden");

    let actual=preguntasActuales[indice];

    progreso.textContent=
    `Pregunta ${indice+1} de ${preguntasActuales.length}`;

    pregunta.textContent=actual.pregunta;

    respuestas.innerHTML="";

    let opciones=mezclar(actual.opciones);

    opciones.forEach(opcion=>{

        let boton=document.createElement("button");

        boton.className="answer";

        boton.textContent=opcion;

        boton.onclick=()=>responder(
            boton,
            opcion,
            actual.correcta
        );

        respuestas.appendChild(boton);

    });

}

function responder(boton,respuesta,correcta){

    const todos=document.querySelectorAll(".answer");

    todos.forEach(x=>x.disabled=true);

    if(respuesta===correcta){

        boton.classList.add("correct");

        aciertos++;

    }else{

        boton.classList.add("incorrect");

        errores.push(
            preguntasActuales[indice]
        );

        todos.forEach(x=>{

            if(x.textContent===correcta){

                x.classList.add("correct");

            }

        });

    }

    btnSiguiente.classList.remove("hidden");

}

btnSiguiente.onclick=()=>{

    indice++;

    if(indice<preguntasActuales.length){

        cargarPregunta();

    }else{

        finalizar();

    }

};

function finalizar(){

    quiz.classList.add("hidden");

    resultado.classList.remove("hidden");

    let fallos=
    preguntasActuales.length-aciertos;

    let nota=
    ((aciertos/preguntasActuales.length)*10)
    .toFixed(2);

    document.getElementById("estadisticas")
    .innerHTML=
    `✅ ${aciertos} aciertos<br>
     ❌ ${fallos} fallos`;

    document.getElementById("nota")
    .textContent=`Nota: ${nota}/10`;

}

document.getElementById("btnRepasar")
.onclick=()=>{

    if(errores.length===0){

        alert("No tienes errores.");

        return;
    }

    preguntasActuales=mezclar([...errores]);

    indice=0;
    aciertos=0;

    errores=[];

    resultado.classList.add("hidden");
    quiz.classList.remove("hidden");

    cargarPregunta();

};

function volverMenu(){

    quiz.classList.add("hidden");
    resultado.classList.add("hidden");

    menu.classList.remove("hidden");

}