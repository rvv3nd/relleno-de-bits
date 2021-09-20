const ascii = [
    "␀","␁","␂", "␃","␄",
    "␅","␆", "␇", "␈", "␉",
    "␊", "␋",  "␌",  "␍", "␎",
    "␏", "␐", "␑", "␒","␓",    
    "␔","␕", "␖", "␗","␘",
    "␙", "␚", "␛", "␜", "␝",
    "␞", "␟",  "␡", 
    " ",  "!",   "\"", "#",    
    "$",  "%",   "&",   "'",  "(",    
    ")",  "*",   "+",   ",",  "-",    
    ".",  "/",   "0",   "1",  "2",    
    "3",  "4",   "5",   "6",  "7",    
    "8",  "9",   ":",   ";",  "<",    
    "=",  ">",   "?",   "@",  "A",    
    "B",  "C",   "D",   "E",  "F",    
    "G",  "H",   "I",   "J",  "K",    
    "L",  "M",   "N",   "O",  "P",    
    "Q",  "R",   "S",   "T",  "U",    
    "V",  "W",   "X",   "Y",  "Z",    
    "[",  "\\",  "]",   "^",  "_",    
    "`",  "a",   "b",   "c",  "d",    
    "e",  "f",   "g",   "h",  "i",    
    "j",  "k",   "l",   "m",  "n",    
    "o",  "p",   "q",   "r",  "s",    
    "t",  "u",   "v",   "w",  "x",    
    "y",  "z",   "{",   "|",  "}",    
    "~",         "Ç",   "ü",  "é",
    "â",  "ä",   "à",   "å",  "ç",
    "ê",  "ë",   "è",   "ï",  "î",
    "ì",  "Ä",   "Å",   "É",  "æ",
    "Æ",  "ô",   "ö",   "ò",  "û",
    "ù",  "ÿ",   "Ö",   "Ü",  "ø",
    "£",  "Ø",   "×",   "ƒ",  "á",    
    "í",  "ó",   "ú",   "ñ",  "Ñ",   
    "ª",  "º",   "¿",   "®",  "¬",    
    "½",  "¼",   "¡",   "«",  "»",    
    "░",  "▒",   "▓",   "│",  "┤",
    "Á",  "Â",   "À",   "©",  "╣",
    "║",  "╗",   "╝",   "¢",  "¥",
    "┐",  "└",   "┴",   "┬",  "├",    
    "─",  "┼",   "ã",   "Ã",  "╚",
    "╔",  "╩",   "╦",   "╠",  "═",
    "╬",  "¤",   "ð",   "Ð",  "Ê",
    "Ë",  "È",   "ı",   "Í",  "Î",
    "Ï",  "┘",   "┌",   "█",  "▄",
    "¦",  "Ì",   "▀",   "Ó",  "ß",
    "Ô",  "Ò",   "õ",   "Õ",  "µ",
    "þ",  "Þ",   "Ú",   "Û",  "Ù",
    "ý",  "Ý",   "¯",   "´",  "≡",
    "±",  "‗",   "¾",   "¶",  "§",
    "÷",  "¸",   "°",   "¨",  "·",
    "¹",  "³",   "²",   "■",  " "
  ]

const profile_images = ["img/pp_1_icon.png", "img/pp_2_icon.png", "img/pp_3_icon.png"]
/*
Funciones para arrastrar y recuperar archivos
*/

var user_img = 0 //variable que define el numero de imagen asignado al inciar sesion
var user_name = "user1" //obtenida en inicio de sesión

function dragOverHandlerTxt(event){
    event.preventDefault();
    //console.log('Fichero(s) detectados');
}
function dropHandlerTxt(event){
    event.preventDefault();
    //console.log('Texto arrastrado');
    for (var i = 0; i < event.dataTransfer.items.length; i++) {
        // Si los elementos arrastrados no son ficheros, rechazarlos
        if (event.dataTransfer.items[i].kind === 'file') {
          var file = event.dataTransfer.items[i].getAsFile();
          //console.log('... file[' + i + '].name = ' + file.name);
          const data = file.text();
          data.then(
            text => InputTexto.value = text
          ); //manejador de promesa!
        }
      } 
}
function dragOverHandlerKey(event){
    event.preventDefault();
    //console.log('Fichero(s) detectados');
}
function dropHandlerKey(event){
    event.preventDefault();
    //console.log('Clave arrastrada');
    for (var i = 0; i < event.dataTransfer.items.length; i++) {
        // Si los elementos arrastrados no son ficheros, rechazarlos
        if (event.dataTransfer.items[i].kind === 'file') {
          var file = event.dataTransfer.items[i].getAsFile();
          //console.log('... file[' + i + '].name = ' + file.name);
          const data = file.text();
          data.then(
            text => InputClave.value = text
          ); //manejador de promesa!
        }
      } 
}
/*
Funcion que obtiene el texto y la clave del html
los pasa a la función principal y devuelve el resultado en un inner text 
*/
function getData(){
    const text = document.getElementById("InputTexto").value
    const key = document.getElementById("InputClave").value
    createMessage(rellena(text,key),key)
    document.getElementById("InputTexto").value = ""  
}

function createMessage(texto,key){
  var date = new Date()
  var division = document.createElement('div')
  division.className = "globe"
  var user = document.createElement('p')
  user.setAttribute("name","user_name")
  var mensaje = document.createElement('p')
  mensaje.setAttribute("name","msj")
  mensaje.setAttribute("onclick",'decifraMensajeRecibido(" '+rellena(texto,key)+' " )')
  var time = document.createElement('p')
  time.setAttribute("name","time")
  var img = document.createElement('img')
  img.id = "profile_img"
  img.src = profile_images[user_img]
  user.innerText = user_name + " says:"
  mensaje.innerHTML = texto
  time.innerText = `at ${date.getHours()}:${date.getMinutes()}`
  division.appendChild(img)
  division.appendChild(user)
  division.appendChild(mensaje);
  division.appendChild(time);
  document.getElementById("mensajes").appendChild(division)
}


function decifraMensajeRecibido(texto){
  confirm(`Traducción: ${texto}.`)
  
}

/*
Funcion que codifica o decodifica
*/

function rellena(txt,key){

    var t = []
    var k = []
    if(txt.length > key.length){
        /*Cuando la longitud del texto sea mayor, 
        se buscara un longitud en la que se reduzca la clave
        a manera de que ambas sean del mismo tamaño*/
    }else{
        txt.split("").forEach(element => {
            t.push(ascii.indexOf(element))
        });
        key.split("").forEach(element => {
            k.push(ascii.indexOf(element))
        });
    }
    
    return doXOR(t,k)
}

function doXOR(text,key){
  var cad = ""
  for(let i=0;i<text.length;i++){
    console.log(`${text[i].toString(2)} XOR  ${key[i].toString(2)} : ${(text[i] ^ key[i]).toString(2)} `);
    cad += ascii[(text[i] ^ key[i])]
  }
  console.log(cad)
  return cad
}