let form = document.forms[0];

async function send(data){
    let res = await fetch("/collection", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    let info = await res.json();
    console.log(info);
};


form.addEventListener("submit", function(e){
    e.preventDefault();
    let body = {};

    for (let i = 0; i < form.elements.length; i++){
        let el = form.elements[i];
        if(el.name) {
            body[el.name] = el.value;
        }
    }
    console.log(body);
    send(body);
});