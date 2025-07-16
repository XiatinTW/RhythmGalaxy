function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
}
if (getCookie('user_id')) {
    window.location.href = "http://localhost/rhythmGalaxy/index_Login.html";
}