<script>
function shouldShowPopup() {

  var ip = getCookie('popup_ip');

  if (!ip) {
    return true;
  }

  var today = new Date();
  var lastClick = new Date(ip);
  if (today.getFullYear() === lastClick.getFullYear() &&
      today.getMonth() === lastClick.getMonth() &&
      today.getDate() === lastClick.getDate()) {
    return false;
  }

  return true;
}

function showPopup() {
  document.querySelector(".popup").style.display = "block";
}

function closePopup() {
  document.querySelector(".popup").style.display = "none";
}

function setPopupPosition() {
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var popup = document.querySelector(".popup-content");
  var popupHeight = popup.clientHeight;
  var margin = (windowHeight - popupHeight) / 2;
  popup.style.marginTop = margin + "px";
}

window.addEventListener("resize", setPopupPosition);

document.querySelector('.popup-content').addEventListener('click', function() {
  var now = new Date();
  setCookie('popup_ip', now.toUTCString());
  closePopup();
});


window.addEventListener('scroll', function() {

  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var documentHeight = document.documentElement.scrollHeight;
  var scrollMiddle = scrollTop + (windowHeight / 2);


  if (shouldShowPopup() && scrollMiddle >= (documentHeight / 2)) {
    showPopup();
    setPopupPosition();
  } else {
    closePopup();
  }
});

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

window.onload = function() {
  if (shouldShowPopup()) {
    showPopup();
    setPopupPosition();
  }
};
</script>