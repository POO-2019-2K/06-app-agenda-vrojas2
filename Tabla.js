import Contacto from "./Contacto.js";

export default class Tabla {
  constructor(tableLista) {
    this._tableLista = tableLista;
    //localStorage.removeItem("contactos");
    this._contactos = [];
    this._initTables();
  }

  _initTables() {
    let contactos = JSON.parse(localStorage.getItem("contactos"));
    if(contactos === null){
      return;
    }
    contactos.forEach((contacto, index) => {
      contacto.birthday = new Date(contacto.birthday);
      this._showInTable(new Contacto(contacto));
    });
  }

  _showInTable(contacto) {
    let row = this._tableLista.insertRow(-1);

    let cellName = row.insertCell(0);   
    let cellEmail = row.insertCell(1);
    let cellBirthday = row.insertCell(2);
    let cellAge = row.insertCell(3);

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
  }

  addContacto(contacto) {
    this._showInTable(contacto);
      localStorage.setItem("contactos", JSON.stringify(this._contactos));
      //console.log(localStorage.getItem("contactos"));
  }
}