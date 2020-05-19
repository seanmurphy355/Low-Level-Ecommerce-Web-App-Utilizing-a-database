document.getElementById("in_stock").addEventListener("click", function() {
  document.getElementsByClassName("out")[0].setAttribute("hidden", true);
  document.getElementsByClassName("in")[0].removeAttribute("hidden");
}, false);

document.getElementById("out_stock").addEventListener("click", function() {
  document.getElementsByClassName("in")[0].setAttribute("hidden", true);
  document.getElementsByClassName("out")[0].removeAttribute("hidden");
}, false);

document.getElementById("all").addEventListener("click", function() {
  document.getElementsByClassName("in")[0].removeAttribute("hidden");
  document.getElementsByClassName("out")[0].removeAttribute("hidden");
}, false);