$(window).ready(() => {
  let params = new URL(window.location.href).searchParams;
  const userid = sessionStorage.getItem("userid");
  console.log(userid);

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
  axios
    .get("http://localhost:3000/items")
    .then((response) => {
      item_data = response.data;
      console.log(item_data);
      let homeopathy = [];
      let vit_sup = [];
      let ayurveda = [];
      let health_food_drinks = [];
      let healthcare = [];
      let skin_care = [];

      for (i = 0; i < item_data.length; i++) {
        if (item_data[i].category == "Homeopathy") {
          homeopathy.push(item_data[i]);
        }
        if (item_data[i].category == "Health , Food & Drinks") {
          health_food_drinks.push(item_data[i]);
        }
        if (item_data[i].category == "Vitamins & Supplements") {
          vit_sup.push(item_data[i]);
        }
        if (item_data[i].category == "Healthcare Devices") {
          healthcare.push(item_data[i]);
        }
        if (item_data[i].category == "Skin Care") {
          skin_care.push(item_data[i]);
        }
        if (item_data[i].category == "Ayurveda") {
          ayurveda.push(item_data[i]);
        }
      }

      // Showing Items

      // HOMEOPATHY
      let homeopathy_res = ``;

      for (j = 0; j < homeopathy.length; j++) {
        homeopathy_res += `
        <div class="single-features-area " onclick="viewDetail(${homeopathy[j].elecid})">
        <img src="./images/${homeopathy[j].image}" style="height:200px;width:400px">
               <!-- Price -->
               <div class="price-start">
               </div>
               <div class="feature-content  align-items-center justify-content-between"
                   style="height:200px">
                   <div class="feature-title">
                       <p>
                       ${homeopathy[j].title}
                       </p>
                       <h5>
                       ${homeopathy[j].price}
                       </h5>
                   </div>
                   <div style="font-size:small; color:#A9A9A9">
                       Expiry :  ${homeopathy[j].expiry}</div>
                       </br>
                  </br>
                  </div>
               </div>
          `;
      }

      $("#homeopathy").html(homeopathy_res);

      //Vitamins Supplements

      let vit_sup_res = ``;
      for (k = 0; k < vit_sup.length; k++) {
        vit_sup_res += `
        <div class="single-features-area" onclick="viewDetail(${vit_sup[k].elecid})">
        <img src="./images/${vit_sup[k].image}" style="height:200px;width:400px">
             <!-- Price -->
             <div class="price-start">
             </div>
             <div class="feature-content  align-items-center justify-content-between"
                 style="height:200px">
                 <div class="feature-title">
                     <p>
                     ${vit_sup[k].title}
                     </p>
                     <h5>
                     ${vit_sup[k].price}
                     </h5>
                 </div>
                           
                 <div style="font-size:small; color:#A9A9A9">
                     Expiry :  ${vit_sup[k].expiry}</div>
                </br>
                 <br>
             </div>
             </div>
        `;
      }
      $("#vitamins").html(vit_sup_res);

      //Ayurveda
      let ayurveda_res = ``;
      for (l = 0; l < ayurveda.length; l++) {
        ayurveda_res += `
        <div class="single-features-area" onclick="viewDetail(${ayurveda[l].elecid})">
        <img src="./images/${ayurveda[l].image}" style="height:200px;width:400px">
             <!-- Price -->
             <div class="price-start">
             </div>
             <div class="feature-content  align-items-center justify-content-between"
                 style="height:200px">
                 <div class="feature-title">
                     <p>
                     ${ayurveda[l].title}
                     </p>
                     <h5>
                     ${ayurveda[l].price}
                     </h5>
                 </div>
                           
                 <div style="font-size:small; color:#A9A9A9">
                     Expiry :  ${ayurveda[l].expiry}</div>
                </br>
                 <br>
             </div>
             </div>
    `;
      }
      $("#ayurveda").html(ayurveda_res);

      //Health food drinks

      let hfd_res = ``;
      for (m = 0; m < health_food_drinks.length; m++) {
        hfd_res += `
        <div class="single-features-area" onclick="viewDetail(${health_food_drinks[m].elecid})">
        <img src="./images/${health_food_drinks[m].image}" style="height:200px;width:400px">
             <!-- Price -->
             <div class="price-start">
             </div>
             <div class="feature-content  align-items-center justify-content-between"
                 style="height:200px">
                 <div class="feature-title">
                     <p>
                     ${health_food_drinks[m].title}
                     </p>
                     <h5>
                     ${health_food_drinks[m].price}
                     </h5>
                 </div>
                           
                 <div style="font-size:small; color:#A9A9A9">
                     Expiry :  ${health_food_drinks[m].expiry}</div>
                </br>
                 <br>
             </div>
             </div>
        `;
      }
      $("#hfd").html(hfd_res);

      //Healthcare
      let healthcare_res = ``;
      for (n = 0; n < healthcare.length; n++) {
        healthcare_res += `    
        <div class="single-features-area" onclick="viewDetail(${healthcare[n].elecid})">
        <img src="./images/${healthcare[n].image}" style="height:200px;width:400px">
             <!-- Price -->
             <div class="price-start">
             </div>
             <div class="feature-content  align-items-center justify-content-between"
                 style="height:200px">
                 <div class="feature-title">
                     <p>
                     ${healthcare[n].title}
                     </p>
                     <h5>
                     ${healthcare[n].price}
                     </h5>
                 </div>
                           
                 <div style="font-size:small; color:#A9A9A9">
                     Expiry :  ${healthcare[n].expiry}</div>
                </br>
                 <br>
             </div>
             </div>
         `;
      }
      $("#healthcare").html(healthcare_res);

      //SKINCARE
      let skin_care_res = ``;
      for (o = 0; o < skin_care.length; o++) {
        skin_care_res += `
        <div class="single-features-area" onclick="viewDetail(${skin_care[o].elecid})">

        <img src="./images/${skin_care[o].image}" style="height:200px;width:400px">
              <!-- Price -->
              <div class="price-start">
              </div>
              <div class="feature-content  align-items-center justify-content-between"
                  style="height:200px">
                  <div class="feature-title">
                      <p>
                      ${skin_care[o].title}
                      </p>
                      <h5>
                      ${skin_care[o].price}
                      </h5>
                  </div>
                            
                  <div style="font-size:small; color:#A9A9A9">
                      Expiry :  ${skin_care[o].expiry}</div>
                 </br>
                  <br>
              </div>
              </div>
         `;
      }
      $("#skincare").html(skin_care_res);
    })
    .catch((err) => {
      console.log(err);
    });
});
