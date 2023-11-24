//Cart open Close
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

//Open Cart
cartIcon.onclick =() =>{
   cart.classList.add("active");
};
//Close cart 
 closeCart.onclick =() =>{
   cart.classList.remove("active");
};

//making Add to cart
//Cart Working JS
if(document.readyState == "loading"){
   document.addEventListener("DOMContentLoaded", ready);
}else{
   ready();
}

////////////////////////////Making function 
function ready(){
   //Remove Item From Cart
   var removeCartButtons = document.getElementsByClassName('cart-remove');
   for(var i =0; i< removeCartButtons.length;i++){
       var button = removeCartButtons[i];
       button.addEventListener("click",removeCartItem);
   }
   //Qunatity Change 
   var quantityInputs = document.getElementsByClassName("cart-quantity");
   for(var i =0; i< quantityInputs.length;i++){
       var input = quantityInputs[i];
       input.addEventListener("change",quantityChanged);
   }

   //Add to cart 
   var addCart = document.getElementsByClassName("add-cart");
   for(var i =0; i< addCart.length;i++){
       var button = addCart[i];
       button.addEventListener("click",addCartClicked);
   }
   loadCartItems();
}

//Remove Cart Item
function removeCartItem(event){
   var buttonClicked =event.target;
   buttonClicked.parentElement.remove();
   updateTotal();
   saveCartItems();
   updateCartIcon();
}
//Quantity Change
function quantityChanged(event){
   var input =event.target;
   if(isNaN(input.value) || input.value <= 0){
       input.value = 1;
   }
   updateTotal();
   saveCartItems();
   updateCartIcon();
}

//Add cart function 
function addCartClicked(event){
   var button =event.target;
   var shopProducts =button.parentElement;
   var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
   var price =shopProducts.getElementsByClassName('price')[0].innerText;
   var productImg =shopProducts.getElementsByClassName('product-img')[0].src;
   addProductToCart(title, price,productImg);
   updateTotal();
   saveCartItems();
   updateCartIcon();
}

function addProductToCart(title,price,productImg){
   var cartShopBox = document.createElement('div');
   cartShopBox.classList.add('cart-box');
   var cartItems = document.getElementsByClassName("cart-content")[0];
   var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
   for(var i= 0 ; i <  cartItemsNames.length; i++){
       if (cartItemsNames[i].innerText == title){
           alert("You Have Already Added This Item To CArt");
           return;
       }
   }
   var cartBoxContent = `
   <img src="${productImg}" alt="" class="cart-img"/>
   <div class="details-box">
       <div class="cart-product-title">${title}</div>
       <div class="cart-price">${price}</div>
       <input type="number" name="" id="" value="1" class="cart-quantity">
   </div>
   <!--Remove Item-->
   <i class="ri-delete-bin-line cart-remove"></i>`;
   cartShopBox.innerHTML =cartBoxContent;
   cartItems.append(cartShopBox);
   cartShopBox.getElementsByClassName('cart-remove')[0]
   .addEventListener('click',removeCartItem);
   cartShopBox.getElementsByClassName('cart-quantity')[0]
   .addEventListener('change',quantityChanged);
   saveCartItems();
   updateCartIcon();
}
// Update Total 
function updateTotal(){
   var cartContent =document.getElementsByClassName('cart-content')[0];
   var cartBoxes = cartContent.getElementsByClassName('cart-box');
   var total = 0;

   for(var i= 0 ; i <  cartBoxes.length; i++){
       var cartBox = cartBoxes[i];
       var priceElement =cartBox.getElementsByClassName('cart-price')[0];
       var quantityElement =cartBox.getElementsByClassName('cart-quantity')[0];
       if (priceElement && quantityElement) { // Check if the elements exist
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = parseInt(quantityElement.value);
  
        if (!isNaN(price) && !isNaN(quantity)) { // Check if price and quantity are valid numbers
          total += price * quantity;
        }
      }
    }
  
    // Round the total to two decimal places(if price contain some cents)
    total = Math.round(total * 100) / 100;
  
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    //save Total 
    localStorage.setItem('cartTotal',total)
  }

  //keep item in Cart when page refresh with localstorage
  function saveCartItems() {
     var cartContent = document.getElementsByClassName('cart-content')[0];
     var cartBoxes = cartContent.getElementsByClassName('cart-box');
     var cartItems = [];
   
     for (var i = 0; i < cartBoxes.length; i++) {
       var cartBox = cartBoxes[i];
       var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
       var priceElement = cartBox.getElementsByClassName('cart-price')[0];
       var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
       var productImg = cartBox.getElementsByClassName('cart-img')[0];
   
       if (titleElement && priceElement && quantityElement && productImg) {
         var item = {
           title: titleElement.innerText,
           price: priceElement.innerText,
           quantity: quantityElement.value,
           productImg: productImg.src,
         };
         cartItems.push(item);
       }
     }
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
   }
   
  // loads In Cart 
  function loadCartItems (){
     var cartItems = localStorage.getItem('cartItems');
     if (cartItems){
        cartItems = JSON.parse(cartItems);

        for ( var i = 0; i < cartItems.length; i++){
           var item = cartItems[i];
           addProductToCart(item.title , item.price, item.productImg);

           var cartBoxes = document.getElementsByClassName('cart-box');
           var cartBox = cartBoxes[cartBoxes.length -1];
           var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
           quantityElement.value = item.quantity;
        }
     }
     var cartTotal = localStorage.getItem('cartTotal');
     if (cartTotal){
        document.getElementsByClassName('total-price')[0].innerText = "$" + cartTotal;
     }
     updateCartIcon();
  }

  //Quantity In Cart Icon 
  function updateCartIcon(){
     var cartBoxes = document.getElementsByClassName('cart-box');
     var quantity = 0 ;

     for ( var i = 0; i < cartBoxes.length; i++){
        var cartBox =cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
       
        if (quantityElement) {
           quantity += parseInt(quantityElement.value);
         }
     }

  var cartIcon = document.querySelector("#cart-icon");
  cartIcon.setAttribute("data-quantity", quantity);
  }

  
///////////////Measurement Page /////////////////

document.addEventListener('DOMContentLoaded', function() {
   // Select all input fields and the submit button
   const inputFields = document.querySelectorAll('.inputField');
   const submitButton = document.getElementById('submitButton');
   const measurementForm = document.getElementById('measurementForm');
 
   // Disable the button initially
   submitButton.disabled = true;
 
   inputFields.forEach(function(input) {
     input.addEventListener('input', function() {
       // Check if all input fields have a value
       let allFilled = Array.from(inputFields).every(field => field.value !== '');
 
       if (allFilled) {
         // If all fields are filled, enable the button
         submitButton.disabled = false;
       } else {
         // Otherwise, disable the button
         submitButton.disabled = true;
       }
     });
   });
 
   // Listen for the form's submit event
   measurementForm.addEventListener('submit', function(event) {
     let allFilled = Array.from(inputFields).every(field => field.value !== '');
     if (!allFilled) {
       // Prevent form from being submitted
       event.preventDefault();
       // Show an alert if not all fields are filled
       alert('Please fill out all fields before submitting.');
     } else {
       // Otherwise, submit the form
       // You'll want to replace this with actual form submission code
       console.log('Form submitted');
       window.location.href = 'Address.html';
     }
   });
 });
 



 