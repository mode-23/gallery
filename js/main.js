let headerMenu = document.querySelector('.innerHeader');
let header = document.getElementsByTagName('header')[0];
headerMenu.addEventListener('click', showHeader);
let homeMode = 'home';
function showHeader(e){
  header.classList.toggle('visible');
  this.parentElement.classList.toggle('active');
  if(homeMode == 'home'){
    e.target.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    homeMode = 'close';
  }else if(homeMode == 'close'){
    e.target.innerHTML = '<i class="fa-solid fa-house"></i>';
    homeMode = 'home';
  }
}
/*TOGGLE MENU*/
let toggleMenu= document.querySelector(".toggleMenu");
let mediaLinks= document.querySelector(".mediaLinks");
let links = document.querySelectorAll('.links .maink');
toggleMenu.addEventListener("click" , () =>{
  toggleMenu.classList.toggle("active");
  mediaLinks.classList.toggle('active');
  document.body.classList.toggle('fixed');
});
links.forEach(link =>{
  link.addEventListener('click', addActiveMain)
})
function addActiveMain(){
  links.forEach(link =>{
    link.classList.remove('active');
    this.classList.add('active');
  })
}
// let  numberOfproducts = document.querySelector('.numberOfproducts');
document.querySelector(".searchCart").addEventListener("click", () => {
     document.querySelector(".searchHolder").classList.add("active");
     document.getElementById("search").focus();
   });
   document.getElementById("search").addEventListener("blur", () => {
     document.querySelector(".searchHolder").classList.remove("active");
   });
   document.querySelector(".cartCount").addEventListener("click", () => {
     document.querySelector(".innerCart").classList.toggle("active");
     document.body.classList.toggle("fixed");
     document.querySelector(".shoppingCart").classList.toggle("active");
   });
   let addToCart = document.getElementsByClassName("addToCart");
   for (let i = 0; i < addToCart.length; i++) {
     addToCart[i].addEventListener("click", addtoCartClicked);
   }
   var newPro;
   if(localStorage.product != null){
   newPro = JSON.parse(localStorage.product)
   }else{
     newPro = [];
   }
   function addtoCartClicked(e) {
     let productItem  = e.target.closest('.productItem');
     let productImg = productItem.querySelector(".productImg").src;
     let productName = productItem.querySelector(".productName").innerHTML;
     let productPriceStr = productItem.querySelector(".productPrice").innerHTML;
     let productPirce = parseFloat(productPriceStr.replace("$", ""));
     var pro = {
       price : productPirce,
       name : productName,
       img : productImg
     }
       newPro.push(pro);
       localStorage.setItem('product',JSON.stringify(newPro));
     addtoCartItems(pro);
   }
   let  numberOfproducts = document.querySelector('.numberOfproducts');
   function addtoCartItems(pro) {
     var productRow = document.createElement("tr");
     productRow.classList.add("productRow");
     var tbody = document.querySelector(".tbody");
     var productNameTab = tbody.getElementsByClassName("productNameTab");
     for (var i = 0; i < productNameTab.length; i++) {
       if (productNameTab[i].innerHTML == pro.name) {
         +productNameTab[i].parentElement.parentElement.parentElement.querySelector('.tablequantity').value++;
         updatetotalToCart();
         return;
       }
     }
      var cartcontent = `
     <td class="descriptionColumn"><img src=${pro.img} class="tableImg">
     <div class="pronameHolder">
     <h3 class="productNameTab">${pro.name}</h3>
     <div class="stars">
     <i class="fa-solid fa-star"></i>
     <i class="fa-solid fa-star"></i>
     <i class="fa-solid fa-star"></i>
     <i class="fa-solid fa-star"></i>
     <i class="fa-solid fa-star"></i>
     </div>
     </div>
     </td>
     <td class="quantityColumn"><button class="plus btn"><i class="fa-solid fa-plus"></i></button><input type="text"  value="1" class="tablequantity"><button class="minus btn"><i class="fa-solid fa-minus"></i></button></td>
     <td><h3 class="tablePrice">${"$" + pro.price}</h3></td>
     <td><button class="removeItem" onclick="removeItemDone(this.parentElement.parentElement)">
     <i class="fa-solid fa-ban"></i></button></td>
   `;
     productRow.innerHTML = cartcontent;
     tbody.append(productRow);
     productRow.getElementsByClassName("tablequantity")[0].addEventListener("change", quantityChanged);
     productRow.getElementsByClassName('plus')[0].addEventListener('click', plused);
     productRow.getElementsByClassName('minus')[0].addEventListener('click', minused);
     numberOfproducts.innerHTML = document.querySelectorAll('.productRow').length;
     document.querySelector('.notification').innerHTML = document.querySelectorAll('.productRow').length;
     updatetotalToCart();
   }
   //remove Item
   function removeItemDone(ef) {
     ef.remove();
     numberOfproducts.innerHTML = document.querySelectorAll('.productRow').length;
     document.querySelector('.notification').innerHTML = document.querySelectorAll('.productRow').length;
     updatetotalToCart();
   }
   //quantity input
       function quantityChanged(event) {
       var input = event.target;
       if (isNaN(input.value) || input.value <= 0  || input.value > 99) {
             input.value = 1;
       }
     updatetotalToCart();
       }
       function plused(ek){
       let tagetPlus = ek.target.parentElement;
       let input  = tagetPlus.querySelector('.tablequantity');
       (parseInt(input.value++));
     updatetotalToCart();
       }
       function minused(es){
             let targetMinus = es.target.parentElement;
             let input  = targetMinus.querySelector('.tablequantity');
             (parseInt(input.value--));
             if(parseInt(input.value) <= 0){
                 parseInt(input.value =1);
                 input.parentElement.parentElement.remove();
             }
       updatetotalToCart();
       numberOfproducts.innerHTML = document.querySelectorAll('.productRow').length;
       document.querySelector('.notification').innerHTML = document.querySelectorAll('.productRow').length;
       }
   //total
   function updatetotalToCart() {
     var discount = document.querySelector('.discount');
     var delivrary = document.querySelector('.delivrary').innerText.replace("$", "");
     var tbody = document.querySelector(".tbody");
     var productRows = tbody.getElementsByClassName("productRow");
     var total = 0;
     for (var i = 0; i < productRows.length; i++) {
       var tablePrice = productRows[i].querySelector(".tablePrice");
       var tablequantity = productRows[i].querySelector(".tablequantity");
       var price = parseFloat(tablePrice.innerText.replace("$", ""));
       var quantity = tablequantity.value;
       total += price * quantity;
     }
     var Finaldiscount = total - (total * parseInt(discount.innerText)) / 100;
     var Finaldelivrary = Finaldiscount + parseFloat(delivrary);
     total = Math.round(total * 100) / 100;
     document.querySelector(".total").innerHTML = "$" + total.toFixed(2) ;
     document.querySelector(".subTotal").innerText = "$" + Finaldiscount.toFixed(2);
     document.querySelector(".totalOut").innerText = "$" + Finaldiscount.toFixed(2);
     if(Finaldiscount <= 0){
       document.querySelector('.EmptyOrNot').style.display = 'block';
     document.querySelector('.notification').style.display = 'none';
     }else{
       document.querySelector('.EmptyOrNot').style.display = 'none';
     document.querySelector('.notification').style.display = 'flex';
     }
   }
   document.querySelector('.scrollToTop').addEventListener('click', ()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  });
let userInfo = document.querySelector('.userInfo');
userInfo.addEventListener('click', (e)=>{
  e.target.classList.toggle('active');
})