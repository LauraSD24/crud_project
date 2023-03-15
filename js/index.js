
window.addEventListener("DOMContentLoaded",()=>{

    const array_input = document.querySelectorAll(".input_form");
    const container_users_registred = document.querySelector(".container_users_registred");
    const btn_save_user = document.querySelector(".btn_save_user");
    const form = document.querySelector(".form");

    let array_users = [];
    
    get_objects_localstorage();
    

    btn_save_user.addEventListener("click",(e)=>{
        e.preventDefault();

        if(validate_form()){
            alert("¡Campos vacíos! Complete toda la información")
        }else{
            create_user();
            // save_user_localstorage();
            get_objects_localstorage();
            form.reset();
        }
    })

    function create_user() {

        const object_info = {
            name: `${array_input[0].value}`, 
            lastname: `${array_input[1].value}`,
            document: `${array_input[2].value}`,
            phone: `${array_input[3].value}`,
            email: `${array_input[4].value}`,
        }
        array_users.unshift(object_info);

        const array_local = JSON.parse(localStorage.getItem("users"))
        || [];

        if(array_local.length > 0){
            array_local.unshift(object_info);
            localStorage.setItem("users",JSON.stringify(array_local));
        }else{
            localStorage.setItem("users",JSON.stringify(array_users));
        }   
    }

    // function save_user_localstorage() {

    //     const array_local = JSON.parse(localStorage.getItem("users"))
    //     || [];

    //     if(array_local.length > 0){

    //     }else{

    //         localStorage.setItem("users",JSON.stringify(array_local));
    //     }   
    // }

    function get_objects_localstorage() {

        container_users_registred.innerHTML = "";
        const array_local = JSON.parse(localStorage.getItem("users"))
        || [];

            array_local.map((value,i)=>{
                const card = document.createElement("div");
                card.setAttribute("class","card");
    
                card.innerHTML = 
                `<figure class="icon_card"></figure>
                <h2 class="fullname">${array_local[i].name + " " + array_local[i].lastname }</h2>
                <div class="card_data">
                    <h3 class="document_user">${array_local[i].document}</h3>
                    <h3 class="phone_user">${array_local[i].phone}</h3>
                    <h3 class="email_user">${array_local[i].email}</h3>
                </div>
                <div class="btns_card">
                    <button class="btn btn_user">Editar</button>
                    <button class="btn btn_user">Eliminar</button>
                </div>`
    
                container_users_registred.appendChild(card);
            });
        
        return array_local;
       
    };

    function validate_form() {
        let campos_vacios = 0;

        for (let i = 0; i < array_input.length; i++) {
            if(array_input[i].value === ""){
                campos_vacios++;
                break;
            }       
        }
        if(campos_vacios > 0){
            return true;
        }else{
            return false;
        }
    };

})