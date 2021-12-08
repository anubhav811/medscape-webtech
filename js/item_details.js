$(window).ready(() => {
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

  let parma = new URL(document.location).searchParams;
  const elecid = parma.get("elecid");

  axios
    .get("http://localhost:3000/items")
    .then((response) => {
      item_data = response.data;
      let title = "";
      let price = "";
      let description = "";
      let image = "";
      for (i = 0; i < item_data.length; i++) {
        if (item_data[i].elecid == elecid) {
          title = item_data[i].title;
          price = item_data[i].price;
          description = item_data[i].description;
          image = item_data[i].image;

          output = `
  <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-10">
                <div class="card text-center">
                    <div class="card-header" style="font-weight:bold;font-size:20px">
                        ${title}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Price-
                             ${price} /-
                        </li>
                    </ul>

                    <div class="card-body">
                        <img src="./images/${image}" style="height:400px;max-width:95%;border:6px double #545565;"> 
                        <h5 class="card-title">
                            <?= ucwords(${description}) ?>
                        </h5>
                       
                    </div>
                    <input type="hidden" name="bookid" value=${elecid} >
                    <input type="hidden" name="userid"  >
                    <div class="card-footer text-muted">


                        <button  class="btn btn-primary" onclick="addtoCart(${elecid},${userid})">Add To Cart</button>

                        <button href="index.html" class="btn btn-primary">Continue shopping</button>

                    </div>
                   
                </div>

            </div>
        </div>`;
        }
      }
      $(".item_details").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
});
