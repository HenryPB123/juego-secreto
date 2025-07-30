let secretNumber = 0;
let contador = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 5;

let agregarTextoElemento = (element, text) => {
  let elementoHTML = document.querySelector(element);
  elementoHTML.innerHTML = text;
};

// Función para generar un número secreto aleatorio entre 1 y 10
// y asignarlo a la variable secretNumber
let generateSecretNumber = () => {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  //Verificamos si ya todos los números en el rango jugaron
  if (listaNumerosSorteados.length == numeroMaximo) {
    agregarTextoElemento("p", "Ya todos los números han jugado!");
  } else {
    //Chekea si el numero ya existe en la lista, si sí, la función se llama a si misma de manera recursiva para generar otro número que no este en la lista, si no se agrega al array.
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generateSecretNumber();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      secretNumber = numeroGenerado;
      console.log("lista", listaNumerosSorteados);
      return secretNumber;
    }
  }
};

let initialConditions = () => {
  //inicializar los mensajes del juego
  agregarTextoElemento("h1", "Juego del número secreto");
  agregarTextoElemento("p", `Elige un número entre 1 y ${numeroMaximo}`);

  //generar el número secreto de nuevo y reiniciar el contador
  secretNumber = generateSecretNumber();
  contador = 1;
  console.log(secretNumber);
};
initialConditions();

// funcion para limpiar el input del usuario
// y dejarlo vacío para el siguiente intento
let clearInput = () => {
  document.getElementById("numeroUsuario").value = "";
};

// Función para verificar el intento del usuario
// y comparar el número ingresado con el número secreto
let verificarIntento = () => {
  let numeroDeUsuario = parseInt(
    document.getElementById("numeroUsuario").value
  );

  if (secretNumber === numeroDeUsuario) {
    agregarTextoElemento(
      "p",
      `¡Felicidades! Has adivinado el número secreto ${secretNumber} en ${contador} ${
        contador === 1 ? "intento" : "intentos"
      }.`
    );
    //Habilitar el botón de reinicio
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (numeroDeUsuario < secretNumber) {
      agregarTextoElemento("p", "El número secreto es mayor.");
    } else {
      agregarTextoElemento("p", "El número secreto es menor.");
    }
    contador++;
    clearInput();
  }
};

let reiniciarJuego = () => {
  // Limpiar el input
  clearInput();

  // Reiniciar el juego
  initialConditions();

  // Deshabilitar el botón de reinicio
  document.getElementById("reiniciar").setAttribute("disabled", "true");
};
