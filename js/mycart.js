$(window).ready(() => {
  var user = sessionStorage.getItem("userid");
  const userid = sessionStorage.getItem("userid");
  console.log(userid);

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

  // console.log(user);

  axios
    .post("http://localhost:3000/findcart", { userid: user })
    .then((response) => {
      let output = `<tr style="font-weight:bold">
 
  <td>
      Item Name
  </td>
  <td>
      Price
  </td>
  <td>
      Remove
  </td>`;
      item_data = response.data;
      var name = [];
      var price = [];
      var total_price = 0;
      for (i = 0; i < item_data.length; i++) {
        curr_elec = item_data[i].elec_id;
        axios
          .post("http://localhost:3000/finditem", { elecid: curr_elec })
          .then((response) => {
            total_price += parseInt(response.data[0].price);

            output += `<tr>
           
            <td>
                ${response.data[0].title}
            </td>
            <td>
            ${response.data[0].price}
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteFromCart(${response.data[0].elecid})">
                    <span >X</span>
                </button>
            </td>
            </tr>`;
            $(".cart_items").html(output);
            $(".price_total").html("Total Amount : " + total_price + " /-");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
