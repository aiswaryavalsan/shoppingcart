let label=document.getElementById('label');
let shoppingcart=document.getElementById('shopping-cart');
let basket=JSON.parse(localStorage.getItem("data"))||[];
let calculation=()=>{
    document.getElementById("cartAmount").innerHTML=basket.
  map((x)=>x.quantity).reduce((x,y)=>x+y,0);
  }
  calculation();
console.log(label);
console.log(shoppingcart);
let generatecart=()=>{
    if(basket.length!=0){
        return(shoppingcart.innerHTML=basket.map((x)=>{
            let{id,quantity}=x;
            let search=shopdata.find((y)=>y.id===id)||[];
            console.log(JSON.stringify(search));
            return`
             <div class="cart-items">
             <img width="100" height="80px" src=${search.img}>
            <div class="details">
            <div class="title-price-x">
            <h4 class="title-price"><p>${search.name}</p>
            <p class="item-price">$${search.price}</p></h4>
            <i onclick="removeItem(${id})" class="bi bi-x"></i>
            </div>
            <div class="cart-buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div  id=${id} class="quantity">${quantity}</div>
            <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>$${quantity*search.price}</h3>
            </div>
            </div>
            `;

 
        }).join(""));}
    else{
        shoppingcart.innerHTML=``;
        label.innerHTML=`<h1>CART IS EMPTY</h1>
        <a href="index.html"><button class="homebtn"> GO TO HOME</button></a>`;
    }
}
generatecart();
let increment=(id)=>{
    let selecteditem=id
    let search=basket.find((x)=>x.id===selecteditem.id);
    if(search===undefined){
       basket.push({id:selecteditem.id,quantity:1});
    }
    else{
        search.quantity+=1;
    }
    update(selecteditem.id);
    console.log(basket);
    generatecart();
    totalAmount();;
   
   localStorage.setItem("data",JSON.stringify(basket));
   

}
  let decrement=(id)=>{
    let selecteditem=id;
     let search=basket.find((x)=>x.id===selecteditem.id);
    if(search===undefined)return;
    else if(search.quantity===0){
      return;
    }
    else{
        search.quantity-=1;
    }
    update(selecteditem.id);
   basket=basket.filter((x)=>x.quantity!=0);

   localStorage.setItem("data",JSON.stringify(basket));
   generatecart();
   totalAmount();
   console.log(basket);
   
   
 }
  let update=(id)=>{
   let search=basket.find((x)=>x.id===id);
   document.getElementById(id).innerText=search.quantity;
   calculation();
  }
  let removeItem=(id)=>{
    let itemremove=id;
    basket=basket.filter((x)=>x.id!==itemremove.id);
    localStorage.setItem("data",JSON.stringify(basket));
    generatecart();
    calculation();
    totalAmount();
    
  }
  let totalAmount=()=>{
    if(basket.length!=0){
    let amount=basket.map((x)=>{
        let{id,quantity}=x;
        let search=shopdata.find((y)=>y.id==id)||[];
        return search.price*quantity;
    }).reduce((x,y)=>x+y,0);
    label.innerHTML=`<h3>Total Amount=$${amount}</h3>
    <button class="checkout">checkout</button>
    <button class="clearcart" onclick="clearCart()">clear cart</button>
    `;
  }
  else
  return;
}
  totalAmount();

let clearCart=()=>{
  basket=[];
  localStorage.setItem("data",JSON.stringify(basket));
  calculation();
   generatecart();
}