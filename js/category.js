$(window).ready(() => {
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

  var lookup = {};
  var categories = [];

  axios.get("http://localhost:3000/items").then((response) => {
    item_data = response.data;
    for (var i = 0; i < item_data.length; i++) {
      var category = item_data[i].category;
      if (!(category in lookup)) {
        lookup[category] = 1;
        categories.push(category);
      }
    }
    let output = ``;
    for (j = 0; j < categories.length; j++) {
      output += `
                <div class="col-12 col-sm-6 col-lg-4" onclick="catDetail('${categories[j]}')">
                        <div class="single-features-area mb-50">
                            <!-- Price -->
                            <div class="feature-content d-flex align-items-center justify-content-between">
                                <div class="feature-title cat_homeopathy">
                                    <h5>${categories[j]}</h5>
                                </div>
                            </div>
                        </div>
                </div>
            `;
    }
    $(".cat_row").html(output);
  });
});
