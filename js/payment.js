$(window).ready(() => {
  const userid = sessionStorage.getItem("userid");
  console.log(userid);
  let params = new URL(window.location.href).searchParams;
  const total = params.get("total");

  $("#total_price").html(total);
  if (sessionStorage.getItem("userid") == "") {
    $(".med-signin-btn").html(`<a href="register.html">Sign in or Register</a>
      <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
      <a class="nav-link" href="category.html">Category</a>`);
  } else {
    $(".med-signin-btn")
      .html(`<a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
    <a class="nav-link" href="mycart.html" onclick="viewCart()">My Cart</a>
    <a class="nav-link" href="category.html">Category</a>
    <a class="nav-link" href="register.html" onclick="logout()">Logout</a>`);
  }
});
