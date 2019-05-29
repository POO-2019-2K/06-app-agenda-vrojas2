import Tabla from "./Tabla.js";
import Contacto from "./Contacto.js";

class Main {
  constructor() {
    let tabla = new Tabla(
      document.querySelector("#Lista"),
    );

    document.querySelector("#AddContac").addEventListener("click", () => {
        let form = document.querySelector("#form");
        form.classList.add("was-validated");

        if(form.checkValidity() === true) {
            let name = document.querySelector("#name").value;
            let email = document.querySelector("#email").value;
            let sBirthday = document.querySelector("#birthday").value;
            sBirthday = sBirthday.split("-");

            let birthday = new Date(sBirthday[0], sBirthday[1] - 1, sBirthday[2]);

            let objContacto = {
                name,
                email,
                birthday
            };
            let contacto = new Contacto(objContacto);
            tabla.addContacto(contacto);
        }   
    });
  }
}

let m = new Main();