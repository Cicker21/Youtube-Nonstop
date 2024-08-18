document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.getElementById('saveButton');
  const op1 = document.getElementById('cb1');
  const op2 = document.getElementById('cb2');
  const op3 = document.getElementById('cb3');
  retrieveString()
  // Función para guardar el string en browser.storage.local
  function saveString() {
    var setts = "bso:" + op1.checked + ",oat:" + op2.checked + ",vib:" + op3.checked;
    browser.storage.local.set({ ajustes: setts }).then(() => {
      console.log('ajustes guardados\n' + setts);
    });
  }
  function sBool(str) {
    return str.toLowerCase() == "true";
  }
  // Función para recuperar el valor almacenado y imprimirlo en la consola
  function retrieveString() {
    console.log("leyendo");
    browser.storage.local.get('ajustes').then((result) => {
      if (result.ajustes) {
        console.log(result.ajustes);
        var sts = result.ajustes.split(',');
        op1.checked = sBool(sts[0].split(':')[1]);
        op2.checked = sBool(sts[1].split(':')[1]);
        op3.checked = sBool(sts[2].split(':')[1]);
      } else {
        console.log('No se encontró el valor.');
        saveString();
      }
    });
  }

  // Añadir event listeners a los botones
  saveButton.addEventListener('click', saveString);
});