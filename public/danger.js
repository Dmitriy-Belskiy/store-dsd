let div = document.querySelector(".admin");
const getData = async function(tag){
    let response = await fetch ("/admin/db");
    let result = response.json();
    console.log(result);
};

const updateData = async function(parm, data){
    let response = await fetch(`/admin/db`,{
        method: "put",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
};

const deleteData = async function(param){
    let response = await fetch(`/admin/db/${parm}`,{
        method: "delete",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}