window.addEventListener("DOMContentLoaded", () => {
  //sacar los valores unicos , ejemplo: [1,1,3,3,4,3,5,5] , resultado del ejemplo: [1,3,4,5]
  //insomnia 
  const array_input = document.querySelectorAll(".input_form");
  const container_users_registred = document.querySelector(".container_users_registred");
  const btn_save_user = document.querySelector(".btn_save_user");
  const btn_update = document.querySelector(".btn_update");
  const btn_cancel_update = document.querySelector(".btn_cancel_update");
  const form = document.querySelector(".form");
  const number_users_registred = document.querySelector(".number_users_registred");
  const input_search = document.querySelector(".input_search");
  const icon_delete_all = document.querySelector(".fa-solid");
  const container_registers = document.querySelector(".container_registers");
  const container_modal = document.querySelector(".container_modal");
  const modal = document.querySelector(".modal");
  const message_modal = document.querySelector(".message_modal");
  const icon_close_modal = document.querySelector(".icon_close_modal");
  const container_btns_modal = document.querySelector(".container_btns_modal");

  // console.log(form.getBoundingClientRect());
  // window.addEventListener("scroll",(e)=>{
  //   console.log(window.innerHeight);
  //   console.log(window.visualViewport.pageTop);
  // })
  // console.log(window.innerWidth)

  let card_event;
  let changeBtn = false;
  let array_users = [];
  let array_local;
  let array_local_updated = JSON.parse(localStorage.getItem("users")) || [];
  let accept_event = false;

  get_objects_localstorage(array_local_updated);
  evenBtns();

  btn_save_user.addEventListener("click", (e) => {
    e.preventDefault();

    if (validate_form()) {
      // alert("¡Campos vacíos! Complete toda la información");
      container_modal.style.display = "flex";
      create_btns_modal();
      const btn_accept_modal = document.querySelector(".btn_accept_modal");
      message_modal.innerText = "¡Campos vacíos! Complete toda la información";
      btn_accept_modal.addEventListener("click",()=>{
        container_modal.style.display = "none";
      })

    } else {
      create_user();
      evenBtns();
    }
  });

  function save_user_localstorage() {
    localStorage.setItem("users", JSON.stringify(array_local));
  }
  /*
  Funcion:create_user()
  descripcion:ffdteftdftfteftdttftf
  cfyffyefycy
  fecha:hoy
  autor: Mi lauri
   */
  function create_user() {

    array_local = JSON.parse(localStorage.getItem("users")) || [];

    const userFind = array_local.find((u) => array_input[2].value === u.document) || "";

    if (userFind !== "") {
      alert("El documento ingresado ya existe");
    } else {
      const object_info = {
        name: `${array_input[0].value.toLowerCase().trim()}`,
        lastname: `${array_input[1].value.toLowerCase().trim()}`,
        document: `${array_input[2].value.trim()}`,
        phone: `${array_input[3].value.trim()}`,
        email: `${array_input[4].value.toLowerCase().trim()}`,
      }

      if (array_local.length > 0) {
        array_local.unshift(object_info);
        save_user_localstorage();
        get_objects_localstorage(array_local);
      } else {
        array_users.unshift(object_info);
        localStorage.setItem("users", JSON.stringify(array_users));
        get_objects_localstorage(array_users);
      }
      form.reset();
    }
  }

  function get_objects_localstorage(array) {

    container_users_registred.innerHTML = "";
    array_local = JSON.parse(localStorage.getItem("users")) || [];

    array.map((value) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      card.innerHTML =
        `<figure class="icon_card"></figure>
            <h2 class="fullname">${value.name + " " + value.lastname}</h2>
            <div class="card_data">
                <h3 class="document_user">${value.document}</h3>
                <h3 class="phone_user">${value.phone}</h3>
                <h3 class="email_user">${value.email}</h3>
            </div>
            <div class="btns_card">
                <button class="btn btn_user btn_update_user" id=${value.document}>Editar</button>
                <button class="btn btn_user btn_delete_user" id=${value.document}>Eliminar</button>
            </div>`

      container_users_registred.appendChild(card);
    });
    number_users_registred.innerText = array_local.length;
    return array_local;
  };

  function validate_form() {
    let campos_vacios = 0;

    for (let i = 0; i < array_input.length; i++) {
      if (array_input[i].value === "") {
        campos_vacios++;
        break;
      }
    }
    if (campos_vacios > 0) {
      return true;
    } else {
      return false;
    }
  };

  function delete_user(document_event) {

    // let comfirm_delete = confirm("¿Seguro que desea eliminar el usuario?");
    // container_modal.style.display = "flex";

    // let confirm_delete = active_events_modal();
    // console.log(confirm_delete)

    // if (confirm_delete) {
    array_local = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < array_local.length; i++) {
      if (array_local[i].document === document_event) {
        array_local.splice(i, 1);
        break;
      }
    }
    save_user_localstorage();
    get_objects_localstorage(array_local);
    evenBtns();
    // accept_event = false;
    // }
  };

  function create_btns_modal() {

    container_btns_modal.innerHTML = "";

    container_btns_modal.innerHTML = `
      <button class="btn btn_modal btn_accept_modal">Aceptar</button>
      <button class="btn btn_modal btn_cancel_modal">Cancelar</button>`

    const btn_cancel_modal = document.querySelector(".btn_cancel_modal");

    btn_cancel_modal.addEventListener("click", (e) => {
      container_modal.style.display = "none";
    })
    icon_close_modal.addEventListener("click", (e) => {
      container_modal.style.display = "none";
    })
  }

  function evenBtns() {
    const array_btn_update = [...document.querySelectorAll(".btn_update_user")];
    const array_btn_delete = [...document.querySelectorAll(".btn_delete_user")];

    for (let i = 0; i < array_btn_delete.length; i++) {
      const btn = array_btn_delete[i];
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.id;
        container_modal.style.display = "flex";

        create_btns_modal();
        message_modal.textContent = "¿Está seguro de eliminar este usuario?";
        const btn_accept_modal = document.querySelector(".btn_accept_modal");
        btn_accept_modal.addEventListener("click", () => {
          delete_user(id);
          container_modal.style.display = "none";
        });
      });
    }

    for (let i = 0; i < array_btn_update.length; i++) {
      const btn = array_btn_update[i];
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.id;
        card_event = e.path[2];
        update_user(id);
      });
    }
  }

  function update_user(document_event) {

    if (window.innerWidth <= 600) {
      window.scrollBy(0, -window.visualViewport.pageTop);
    }

    array_local = JSON.parse(localStorage.getItem("users"));
    container_registers.style.pointerEvents = "none";

    const user = array_local.find((u) => document_event === u.document);
    const indexObject = array_local.indexOf(user)
    const array_user = [user.name, user.lastname, user.document, user.phone, user.email];

    array_input.forEach((input, index) => {
      input.value = array_user[index];
    });
    array_input[2].setAttribute("readOnly", "true");
    changeBtn = true;

    btn_save_user.classList.add("btn_ocult");
    btn_update.classList.remove("btn_ocult");
    btn_cancel_update.classList.remove("btn_ocult");
    btn_update.setAttribute("id", indexObject);
    return indexObject;
  };

  btn_update.addEventListener("click", (e) => {
    e.preventDefault()
    if (window.innerWidth <= 600) {
      console.log(card_event);
      window.scrollBy(0, card_event.getBoundingClientRect().top - 100);
    }
    btn_update_user(parseInt(e.currentTarget.id))
    evenBtns();
  });

  function btn_update_user(indexObject) {
    if (changeBtn) {

      array_local[indexObject].name = array_input[0].value.toLowerCase().trim();
      array_local[indexObject].lastname = array_input[1].value.toLowerCase().trim();
      array_local[indexObject].phone = array_input[3].value.trim();
      array_local[indexObject].email = array_input[4].value.toLowerCase().trim();

      if (validate_form()) {
        alert("¡Campos vacíos! Complete toda la información")
      } else {
        save_user_localstorage();
        get_objects_localstorage(array_local);
        evenBtns();
        form.reset();
        btn_save_user.classList.remove("btn_ocult");
        btn_update.classList.add("btn_ocult");
        btn_cancel_update.classList.add("btn_ocult");
        array_input[2].removeAttribute("readOnly");
        container_registers.style.pointerEvents = "visible";
        changeBtn = false;
      }
      evenBtns();
    }
  }

  // @IsArray()
  // const array=[];
  function search(word_filter) {
    // array_local = JSON.parse(localStorage.getItem("users"));
    // expresiones regulares

    let word_filter_no_espaces = word_filter.replace(/ /g, "");
    const array_filter = array_local.filter((u) => (u.name + u.lastname).replace(/ /g, "").includes(word_filter_no_espaces));

    if (array_filter.length > 0) {
      get_objects_localstorage(array_filter);
      container_users_registred.classList.remove("container_users_registred_not_found");
    } else {
      container_users_registred.innerHTML = "No se encontraron registros";
      container_users_registred.classList.add("container_users_registred_not_found");
    }
  }

  input_search.addEventListener("input", (e) => {
    e.preventDefault();
    search(input_search.value.toLowerCase());
    evenBtns();
  })

  function delete_all() {
    // let verify = confirm("¿Está seguro de eliminar todos los usuarios?");

    // if (verify) {
    localStorage.removeItem("users");
    array_local = JSON.parse(localStorage.getItem("users")) || [];
    get_objects_localstorage(array_local);
    // }
  }

  icon_delete_all.addEventListener("click", () => {
    container_modal.style.display = "flex";

    create_btns_modal();
    message_modal.textContent = "¿Está seguro de eliminar todos los usuarios?";
    const btn_accept_modal = document.querySelector(".btn_accept_modal");
    btn_accept_modal.addEventListener("click", () => {
      delete_all();
      container_modal.style.display = "none";
    });
  });
});

