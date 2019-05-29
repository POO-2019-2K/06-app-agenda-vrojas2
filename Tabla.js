import Contacto from "./Contacto.js";

export default class Tabla {
  constructor(tableLista) {
    this._tableLista = tableLista;
    //localStorage.removeItem("contactos");
    this._contactos = [];
    this._initTables();
  }

  _initTables() {
    let lsContactos = JSON.parse(localStorage.getItem("contactos"));
    if(lsContactos === null){
      return;
    }
    lsContactos.forEach((e, index) => {
      e.birthday = new Date(e.birthday);
      this._showInTable(new Contacto(e));
    });
  }

  _repetEmail(email){
    let find = -1;
    this._contactos.forEach((e, index) => {
        if (e.email === email) {
            find = index;
            return;
        }
    });
    return find;
  }

  addContacto(contacto) {
    let found = this._repetEmail(contacto.email);
    if (found >=0) {
        swal.fire({
            type: "error",
            title: "Error",
            text: "Este email ya ha sido utilizado"
        });
        return;
    } else{
      swal.fire({
        type: "success",
        title: "Éxito",
        title: "Registrado",
      });
    }
    this._showInTable(contacto);
    localStorage.setItem("contactos", JSON.stringify(this._contactos));
    //console.log(localStorage.getItem("contactos"));
  }

  _showInTable(contacto) {
    let row = this._tableLista.insertRow(-1);

    let cellName = row.insertCell(0);   
    let cellEmail = row.insertCell(1);
    let cellBirthday = row.insertCell(2);
    let cellAge = row.insertCell(3);
    row.insertCell(4);

    cellName.innerHTML = contacto.name;
    cellEmail.innerHTML = contacto.email;
    cellBirthday.innerHTML = contacto.getBirthdayAsString();
    cellAge.innerHTML = contacto.getAge();

    let objContacto = {
      name: contacto.name,
      email: contacto.email,
      birthday: contacto.birthday,
    };

    this._contactos.push(objContacto);
    this._addButtons(row, contacto);
  }
  
  _addButtons(row, contacto){ 
    let btnDelete = document.createElement("input");
    btnDelete.type = "button";
    btnDelete.value = "Borrar";
    row.cells[4].innerHTML = ""; 
    btnDelete.className = "btnDelet";
    row.cells[4].appendChild(btnDelete);
    btnDelete.addEventListener("click", () => { 
      this._deleteRow(contacto);
    }); 
  }

  _deleteRow(contacto){
    this._contactos = JSON.parse(localStorage.getItem("contactos"));
    this._contactos.forEach((e, index) => {
      if(e.email === contacto.email) {
        this._contactos.splice(index, 1);
      }
    });
    location.reload();
    localStorage.setItem("contactos", JSON.stringify(this._contactos));
  }

}