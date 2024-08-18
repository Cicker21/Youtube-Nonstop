var div = document.getElementById('#middle-row');
var debugB =  false;

//var n = Math.floor(Math.random() * 200);
var activeCalls = 0;

function debugM(inp) {
	if (!debugB) {
		console.log(inp)
	}
}

//UTILS

function sBool(str) {
	return str.toLowerCase() == "true";
}

async function retrieveString() {
	try {
		const result = await browser.storage.local.get('ajustes');
		const resnull = "bso:false,oat:true,vib:true";
		if (result.ajustes) {
			debugM("se pudo\n" + result.ajustes);
			return result.ajustes;
		} else {
			//debugM("no se pudo encontrar ajustes");
			return resnull;
		}
	} catch (error) {
		console.error("Error al recuperar el valor:", error);
		return null;
	}
}
var pinxo = null;
function handlePause() {
	var boton = document.querySelectorAll("#nonstopButton");
	debugM("PINXAO");

	if (boton.length == 0) {
		debugM("No hay botón handlePause() " + boton.length);
	}
	else{
		
		switch(boton[0].textContent){
			case "Nonstop: ON":
				pinxo = "pausao";
			break;
			case "Paused":
				pinxo = "continua";					
			break;
			default:
				pinxo = null;
				debugM("nulo " + boton[0].textContent);
			break;
		}
		debugM(boton[0].textContent + " > " + pinxo);
	}
}
//INIT


if (typeof init == 'undefined') {
	console.log("INIT");
    var init = true;

	console.log("PERSISTE");
	prelude();

	if (window.location.hostname.includes("youtube.com")) {
		debugM("Script ejecutado en el contexto de YouTube.");
	} else {
		debugM("Script no ejecutado en el contexto de YouTube.");
	}

} 
else {
    console.log("La variable ya existe");
	var init = false;
}


async function prelude() {
	while(!div){
		debugM("No hay pagina disponible");
		div = document.getElementById("middle-row");
		await new Promise(resolve => setTimeout(resolve, 5000));
	}
	bucle();
}


var tRestante = 200;
async function bucle() {
	while(true){
		var sett = await retrieveString();
		//console.log("AYAYA " + n);
		var boton = document.querySelectorAll(`#nonstopButton`);

		var objetivo = null;
		if (boton.length < 1) { 
			debugM("No hay botón");

			var innerButt = `<div id="nonstopdiv" style="padding: 15px;"><boton[0] id="nonstopButton" style="background-color: #4CAF50; color: white; padding: 7px 20px; font-size: 16px; border: 2px solid white; border-radius: 5px; margin: 10px;cursor: pointer;white-space: nowrap;"></boton[0]></div>`;
	
			var allAboveDivs = document.querySelectorAll('#above-the-fold');

			// Recorre todos los divs seleccionados
			allAboveDivs.forEach((div, index) => {
			// Comprueba si el div es visible
			const style = window.getComputedStyle(div);
			const isVisible = style.display !== 'none' && style.visibility !== 'hidden' && div.offsetWidth > 0 && div.offsetHeight > 0;

			// Muestra si el div es visible o no
			if (isVisible) {
				console.log(`Div #${index} (above) es visible`);
				objetivo = div.querySelector("#middle-row");
				
			} else {
				console.log(`Div #${index} (above) NO es visible`);
			}
			});
			
	
			if (objetivo) {
				debugM("Creando Botón " + objetivo.length)
				try {
                    objetivo.innerHTML = innerButt + objetivo.innerHTML;
					boton = document.querySelectorAll(`#nonstopButton`);
					
					if (sBool(sett.split(',')[0].split(':')[1])) {
						debugM("apagao por defecto");
						boton[0].textContent = "Nonstop: OFF";
						boton[0].style.backgroundColor = "red";
					}
					else {
						debugM("encendio por defecto");
						boton[0].textContent = "Nonstop: ON";
						boton[0].style.backgroundColor = "#4CAF50";
					}


					boton[0].addEventListener('click', function () {
						if (boton[0].textContent == "Nonstop: ON") {
							boton[0].textContent = "Nonstop: OFF";
							boton[0].style.backgroundColor = "red";
						} else {
							boton[0].textContent = "Nonstop: ON";
							boton[0].style.backgroundColor = "#4CAF50";
						}
					});
                    console.log("Botón insertado correctamente.");
                } catch (error) {
                    console.error("Error al insertar el botón:", error);
                }
				console.log("Botón creado:", boton[0]);
			}
			else {
				debugM("No se pudo crear botón!!");
			}
			
		} 
		else{
		
		//oat
		var allowed = true;
		if (sBool(sett.split(',')[1].split(':')[1])) { 
			if (document.visibilityState == 'visible') {
				debugM("pagina visible: " + document.visibilityState);
			}
			else {
				allowed = false;
				debugM("pagina no visible: " + document.visibilityState);
			}
		}

		//vib
		if (sBool(sett.split(',')[2].split(':')[1])) {
			boton[0].style.visibility = "visible";
		}
		else{
			boton[0].style.visibility = "hidden";
		}

		if (allowed) {
			var videos = document.getElementsByTagName('video');
			//debugM("Número de videos encontrados: " + videos.length);

			function updateTR() {
                tRestante = videos[0].duration - videos[0].currentTime;
            }
			
			//pinxos
			switch(pinxo){
				case "pausao":
					boton[0].textContent = "Paused";
					boton[0].style.backgroundColor = "#1a6cb5";
					pinxo = null;
					break;

				case "continua":
					boton[0].textContent = "Nonstop: ON";
					boton[0].style.backgroundColor = "#4CAF50";		
					pinxo = null;
					break;

			}

			videos[0].removeEventListener('click', handlePause);
            videos[0].removeEventListener('timeupdate', updateTR);

            videos[0].addEventListener('click', handlePause);
            videos[0].addEventListener('timeupdate', updateTR);
			//debugM("El botón está " + boton[0].textContent) ;
			if (boton[0].textContent == "Nonstop: ON") {
				//debugM("TR del video: " + tRestante);
				if (videos.length > 0 && videos[0].paused)  {
					if(tRestante < 5){
						debugM("BUCLE Esperando 10s");
						await new Promise(resolve => setTimeout(resolve, 10000));
						debugM("BUCLE PASS");
					}

					//debugM("Video pausado? (L:" + videos.length + " P: " + videos[0].paused + " T: " +tRestante);
					videos[0].play();

					//delayer(5);
					
					boton[0].textContent = "Nonstop: ON";
					boton[0].style.backgroundColor = "#4CAF50";

					debugM("El video estaba pausado y ahora se está reproduciendo.");
					
				}
				// else {
				// 	//debugM("Video no pausado (Videos: " + videos.length + " Botones: " + boton.length + " Pausa: " + videos[0].paused + " Tr: " +tRestante);
				// }
			}
			if (boton[0].textContent == "Paused" && !videos[0].paused) {
				debugM("ta parao pero continua?");
				await new Promise(resolve => setTimeout(resolve, 5000));
				if (boton[0].textContent == "Paused" && !videos[0].paused) {
					debugM("pos ya no");
					boton[0].textContent = "Nonstop: ON";
					boton[0].style.backgroundColor = "#4CAF50";		
				}
			}
		}
			
		}
		await new Promise(resolve => setTimeout(resolve, 2000));
	}
}