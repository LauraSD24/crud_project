
window.addEventListener("DOMContentLoaded", () => {
    let changeBtn = false;
    const array_input = document.querySelectorAll(".input_form");
    const container_users_registred = document.querySelector(".container_users_registred");
    const btn_save_user = document.querySelector(".btn_save_user");
    const btn_update = document.querySelector(".btn_update");
    const form = document.querySelector(".form");
    const number_users_registred = document.querySelector(".number_users_registred");
    const input_search = document.querySelector(".input_search");

    let array_users = [];
    let array_local = JSON.parse(localStorage.getItem("users")) || [];
    // let array_local_actualiced = JSON.parse(localStorage.getItem("users")) || [];

    get_objects_localstorage(array_local);
    evenBtns();
    // eventSave();

    // function eventSave() {
        btn_save_user.addEventListener("click", (e) => {
            e.preventDefault();
    
            if (validate_form()) {
                alert("¡Campos vacíos! Complete toda la información");
            } else {
                create_user();
                get_objects_localstorage(array_local);
                evenBtns();
            }
        });
    // }

    function save_user_localstorage() {
        localStorage.setItem("users", JSON.stringify(array_local));
    }

    function create_user() {

        // array_local = JSON.parse(localStorage.getItem("users")) || [];

        const userFind = array_local.find((u) => array_input[2].value === u.document) || "";
        console.log(userFind);

        if(userFind !== ""){
            alert("El documento ingresado ya existe");
        }else{
            const object_info = {
                name: `${array_input[0].value}`,
                lastname: `${array_input[1].value}`,
                document: `${array_input[2].value}`,
                phone: `${array_input[3].value}`,
                email: `${array_input[4].value}`,
            }
    
            if (array_local.length > 0) {
                array_local.unshift(object_info);
                save_user_localstorage();
            } else {
                array_users.unshift(object_info);
                localStorage.setItem("users", JSON.stringify(array_users));
            }
            form.reset();
        }
    }

    function get_objects_localstorage(array) {

        container_users_registred.innerHTML = "";
        // array_local = JSON.parse(localStorage.getItem("users")) || [];

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

        window.location.reload();
        
        let comfirm_delete = confirm("¿Seguro que desea eliminar el usuario?");

        if (comfirm_delete) {
            // array_local = JSON.parse(localStorage.getItem("users"));
            for (let i = 0; i < array_local.length; i++) {
                if (array_local[i].document === document_event) {
                    array_local.splice(i, 1);
                    break;
                }
            }
            save_user_localstorage();
            get_objects_localstorage(array_local);
            evenBtns();
        }
    };

    function evenBtns() {
        const array_btn_update = [...document.querySelectorAll(".btn_update_user")]
        const array_btn_delete = [...document.querySelectorAll(".btn_delete_user")]
        console.log(array_btn_delete)
        // console.log(array_btn_update)

        for (let i = 0; i < array_btn_delete.length; i++) {
            const btn = array_btn_delete[i];
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.id;
                delete_user(id)
                console.log("delete");
            })
        }
        for (let i = 0; i < array_btn_update.length; i++) {
            const btn = array_btn_update[i];
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.id;
                update_user(id);
                // btn_update.addEventListener("click",()=>btn_update_user(update_user(id),e));
            })
        }
        // eventSave();
    }

    function update_user(document_event) {
        // array_local = JSON.parse(localStorage.getItem("users"));

        const userFind = array_local.find((u) => document_event === u.document);
        let values_object = array_local[array_local.indexOf(userFind)];
        const indexObject = array_local.indexOf(values_object)
        const user = array_local[indexObject];
        const array_user = [user.name, user.lastname, user.document, user.phone, user.email];

        array_input.forEach((input, index) => {
            input.value = array_user[index];
        });
        array_input[2].setAttribute("readOnly", "true");
        changeBtn = true;

        btn_save_user.classList.add("btn_ocult");
        btn_update.classList.remove("btn_ocult");
        btn_update.setAttribute("id", indexObject);
        return indexObject;
    };

    btn_update.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(e.currentTarget.id)
        btn_update_user(parseInt(e.currentTarget.id))
        evenBtns();
    });

    function btn_update_user(indexObject) {
        if (changeBtn) {
            // array_local = JSON.parse(localStorage.getItem("users"));

            console.log(indexObject);

            array_local[indexObject].name = array_input[0].value;
            array_local[indexObject].lastname = array_input[1].value;
            array_local[indexObject].phone = array_input[3].value;
            array_local[indexObject].email = array_input[4].value;

            if (validate_form()) {
                alert("¡Campos vacíos! Complete toda la información")
            } else {
                save_user_localstorage();
                get_objects_localstorage(array_local);
                evenBtns();
                form.reset();
                btn_save_user.classList.remove("btn_ocult");
                btn_update.classList.add("btn_ocult");
                array_input[2].removeAttribute("readOnly");
                changeBtn = false;
            }
            evenBtns();
        }
    }

    function search(word_filter) {
        // array_local = JSON.parse(localStorage.getItem("users"));
        const array_filter = array_local.filter((u) => u.name.includes(word_filter) || u.lastname.includes(word_filter));
        get_objects_localstorage(array_filter);
    }

    input_search.addEventListener("input", (e)=>{
        e.preventDefault();
        search(input_search.value);
        evenBtns();
    })
});