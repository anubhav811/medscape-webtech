$(window).ready(() => {
  let params = new URL(document.location).searchParams;
  const user = params.get("userid");
  const userid = sessionStorage.getItem("userid");

  if (sessionStorage.getItem("userid") == "") {
    console.log(sessionStorage.getItem("userid"));
    $(".med-signin-btn").html(`<a href="register.html">Sign in or Register</a>
    <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
    <a class="nav-link" href="category.html">Category</a>`);
  } else {
    console.log(sessionStorage.getItem("userid"));
    $(".med-signin-btn")
      .html(`<a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
  <a class="nav-link" href="mycart.html" onclick="viewCart()">My Cart</a>
  <a class="nav-link" href="category.html">Category</a>
  <a class="nav-link" href="register.html" onclick="logout()">Logout</a>`);
  }

  let parma = new URL(document.location).searchParams;
  const cat = parma.get("category");
  console.log(cat);
  axios
    .get("http://localhost:3000/items")
    .then((response) => {
      item_data = response.data;
      let output = ``;
      for (i = 0; i < item_data.length; i++) {
        if (item_data[i].category == cat) {
          console.log(item_data[i].elecid);
          output += ` 
          <div class="single-features-area" onclick="viewDetail(${item_data[i].elecid})">
              <img src="./images/${item_data[i].image}" style="height:200px;width:400px">
                <!-- Price -->
                <div class="price-start">
                </div>
                 <div class="feature-content d-flex align-items-center justify-content-between" style="height:150px">
                     <div class="feature-title">
                    <p>
                        ${item_data[i].title}
                    </p>

                    <h5>
                    ${item_data[i].price} /-
                    </h5></br>
                </div>
        </div>
    </div>`;
        }
      }
      console.log(output);
      $(".cat_items").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
});
