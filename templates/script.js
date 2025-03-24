function handleClick(){
    let searchValue = document.querySelector("search-box").trim();
    searchValue = searchValue.tolowerCase();

    if(searchValue){
        console.log("searching for " + searchValue);
    }
    else{
        console.log("No such event currently exists");
    }
}
document.querySelector("search-btn").addEventListener("click", handleClick);

document.querySelector(".log-btn").addEventListener("click", function () {
    alert("Logging out...");
});

document.querySelectorAll(".dropdown-content a").forEach(element => {
    element.addEventListener("click", function(){
        if(element.innerText == "Admin"){
            window.location.href = "admin-login.html";
        } else if (this.innerText === "User") {
            window.location.href = "user-login.html";
        }
    })
});
