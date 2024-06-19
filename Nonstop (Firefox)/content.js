var div = document.getElementById('top-level-buttons-computed');

function prelude(){
	if(div){
		bucle();
	}
	else{
		console.log("No hay pagina disponible");
		div = document.getElementById('top-level-buttons-computed');
		setTimeout(prelude, 1000);
	}
}
prelude();
console.log("PERSISTE");
if (window.location.hostname.includes("youtube.com")) {
  console.log("Script ejecutado en el contexto de YouTube.");
} else {
  console.log("Script no ejecutado en el contexto de YouTube.");
}
function bucle() {
    // Verificar si el botón con id "nonstopButton" ya existe
    var button = div.querySelector('#nonstopButton');
    if (!button) {
        console.log("No hay botón");
        button = document.createElement("button");
        button.textContent = "Nonstop: ON";

        // Asignar una ID al botón
        button.id = "nonstopButton";

        // Cambiar color y tamaño del botón
        button.style.backgroundColor = "#4CAF50"; // Color de fondo (verde)
        button.style.color = "white"; // Color del texto (blanco)
        button.style.padding = "7px 20px"; // Tamaño del botón (relleno)
        button.style.fontSize = "16px"; // Tamaño del texto
        button.style.border = "2px solid white"; // Borde de 2px de color verde oscuro
        button.style.borderRadius = "5px"; // Bordes redondeados
        button.style.cursor = "pointer"; // Cambiar el cursor al pasar el ratón
		button.style.whiteSpace = "nowrap";
		
		// Añadir event listener para cambiar el color y el texto del botón cuando se pulsa
        button.addEventListener('click', function() {
            if (button.textContent === "Nonstop: ON") {
                button.textContent = "Nonstop: OFF";
                button.style.backgroundColor = "red";
            } else {
                button.textContent = "Nonstop: ON";
                button.style.backgroundColor = "#4CAF50";
            }
        });
		var likeButton = div.querySelector('like-button-view-model');
		if (likeButton) {
        div.insertBefore(button, div.firstChild);
		}
		else{
			console.log("No hay likeButton");
		}
    } else {
        console.log("Hay botón");
        var videos = document.getElementsByTagName('video');
        console.log("Número de videos encontrados:", videos.length);
        // Comprobar el valor del botón
        if (button.textContent === "Nonstop: ON") {
            console.log("El botón está en estado ON");
            if (videos.length > 0 && videos[0].paused) {
                console.log("Video pausado");
                videos[0].play();
                console.log("El video estaba pausado y ahora se está reproduciendo.");
            } else {
                console.log("Video no pausado");
            }
        } else {
            console.log("El botón está en estado OFF");
        }
    }
    setTimeout(bucle, 1000);
}

