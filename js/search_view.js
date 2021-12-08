$(window).ready(() => {
  let params = new URL(window.location.href).searchParams;
  const keyword = params.get("keyword");

  if (sessionStorage.getItem("userid") == "") {
    $(".med-signin-btn").html(`<a href="register.html">Sign in or Register</a>
    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
    <a class="nav-link" href="category.html">Category</a>`);
  } else {
    $(".med-signin-btn")
      .html(`<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
  <a class="nav-link" href="mycart.html" onclick="viewCart()">My Cart</a>
  <a class="nav-link" href="category.html">Category</a>
  <a class="nav-link" href="index.html" onclick="logout()">Logout</a>`);
  }
  let output = ``;
  axios
    .post("http://localhost:3000/findbyname", { title: keyword })
    .then((response) => {
      item_data = response.data;
      console.log(item_data);
      for (j = 0; j < item_data.length; j++) {
        output += `
        <div class="single-features-area " onclick="viewDetail(${item_data[j].elecid})">
        <img src="./images/${item_data[j].image}" style="height:250px;width:250px">
               <!-- Price -->
               <div class="price-start">
               </div>
               <div class="feature-content  align-items-center justify-content-between"
                   style="height:200px">
                   <div class="feature-title">
                       <p>
                       ${item_data[j].title}
                       </p>
                       <h5>
                       ${item_data[j].price}
                       </h5>
                   </div>

                   <div style="font-size:small; color:#A9A9A9">
                       Expiry :  ${item_data[j].expiry}</div>
                       </br>
                  </br>
                  </div>
               </div> `;
      }
      $("#result").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
});
{
}
