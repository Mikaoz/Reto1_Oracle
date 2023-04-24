//almacenamos los caracteres que no queremos permitir
var regex = /[W]|[áéíóúÁÉÍÓÚñÑ¿¡«»“”‘’'"´`+*()\-–_—/\\=|#@^\[\]{}%$§&~;:<>!?]|[A-Z]/g;

//inicializamos la variable de los botones, para saber cuando hacen click
//var boton_encriptar=getElementsByClassName("boton-encriptar");
var boton_encriptar=document.getElementById("boton-encriptar");
var boton_desencriptar=document.getElementById("boton-desencriptar");
var boton_copiar=document.getElementById("boton-copiar");

/*Traemos el texto desde el primer cuadro de texto
que es donde el usuario ingresa el texto a encriptar */
const texto_encriptar=document.getElementById("cuadro-texto-1");

//si el usuario hace click en el boton de encriptar,
//llamamos la funcion encriptar
boton_encriptar.addEventListener("click",encriptar);

/*una vez encriptado, traemos el texto por si el usuario quiere copiar 
con el boton de copiado*/
var texto_desencriptado=document.getElementById("cuadro-texto-2");

//hacemos que el programa valide la información que ingresa el cliente
texto_encriptar.addEventListener("input", validar);

//si el usuario hace click en desencriptar,
//llamamos la funcion desencriptar
boton_desencriptar.addEventListener("click",desencriptar);

//si el usuario hace click en copiar,
//llamamos la funcion copiar
boton_copiar.addEventListener("click",copiar);

/*creamos la función de encriptar*/
function encriptar(){

  var llaves={

    "a":"ai",
    "e":"enter",
    "i":"imes",
    "o":"ober",
    "u":"ufat"
    
  }

  //traemos el texto ingresado
  var texto=texto_encriptar.value;

  //reemplazamos las vocales por lo valores que se encuentran en las llaves
  //usamos una función para que nos devuelva las el codigo correspondiente a la letra
  var texto_A=texto.replace(/[aeiou]/g,function(letra){
    return llaves[letra];
  }); 
   
  //llamamos a la función de cambio de estilo para que nos muestre el cuadro de texto
  cambio_estilo();

  //imprimimos
  imprimir(texto_A);

}

/*creamos la función desencriptar*/
function desencriptar() {

  //para desencriptar damos vuelta las llaves
  var llaves = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u"
  };
  
  //traemos el texto ingresado
  var texto = texto_encriptar.value;
  
  //reemplazamos el texto correspondiente al codigo
  //buscamos en las llaves las correspondientes al codigo y extraemos la letra
  var texto_B = texto.replace(/\b\w+\b/g, function(palabra) {
    return palabra.replace(/ai|enter|imes|ober|ufat/g, function(matched) {
      return llaves[matched];
    });
  });
  
  //imprimimos
  imprimir(texto_B);

}

/*creamos la funcion copiar*/
function copiar(){

  navigator.clipboard.writeText(texto_desencriptado.value);

}

/*creamos la función de imprimir el resultado*/
function imprimir(texto){

  texto_desencriptado.value = texto;

}

/*creamos la funcion para validar el texto: que sean minusculas, sin tildes y no esté vacío*/
function validar(){

  //reemplazamos los caracteres invalidos por un espacio
  var texto_validado=texto_encriptar.value.replace(regex,"");
  //devolvemos el texto con los cmbios correspondientes
  texto_encriptar.value=texto_validado;

}

//cambiamos el estilo: escondemos la imagen de mensaje no encontrado
//y mostramos el cuadro de texto con el boton de copiado
function cambio_estilo(){

  var texto_no_encontrado=document.getElementById("imagen-no-encontrado");
  texto_no_encontrado.style.display="none";
  texto_desencriptado.style.display="flex";
  boton_copiar.style.display="flex";  

}

