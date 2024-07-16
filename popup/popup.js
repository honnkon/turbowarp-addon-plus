var main = document.querySelector("#container");
if (main != null) {
    main.addEventListener("click", function () {
        window.open("/addons", "", "width=1280,height=800");
        return false;
    });
}
