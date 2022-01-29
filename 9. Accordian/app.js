const btns = document.querySelectorAll(".btn");
// const innerDiv = document.querySelectorAll(".inner");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("plus")) {
      btn.innerHTML = "<i class='fas fa-minus'></i>";
      btn.classList.remove("plus");
    } else {
      btn.innerHTML = "<i class='fas fa-plus'></i>";
      btn.classList.add("plus");
    }

    if (btn.parentNode.nextElementSibling.classList.contains("hide")) {
      btn.parentNode.nextElementSibling.className = "inner show";
    } else {
      btn.parentNode.nextElementSibling.className = "inner hide";
    }
    // console.log(btn.parentNode.nextElementSibling.classList.contains("hide"));
  });
});
