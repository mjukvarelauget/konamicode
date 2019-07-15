const konamiEvent = () => {
    let header_element = document.querySelector("#header");
    header_element.style["color"] = "red";
};

addKonamiListener(konamiEvent);
