let shop=document.getElementById("shop");
console.log(shop);

   let basket=JSON.parse(localStorage.getItem("data"))||[];
  let generateshop=()=>{
    return(shop.innerHTML=shopdata.map((x)=>{
        let {id,name,price,img,details}=x;
        let search=basket.find((x)=>x.id===id)||[];
         console.log(search);
        return`<div id=product-id-${id} class="item">
        <img width="200" height="150" src="${x.img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${details}</p>
        <div class="price-quantity">
            <h3>$${price}</h3>
               <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div  id=${id} class="quantity">${search.quantity===undefined?0:search.quantity}</div>
                <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
               </div>
        </div>
        </div>
    </div>`;
    }).join(""));
  };
      
 
  
  generateshop();
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
   console.log(basket);
   
   
 }
  let update=(id)=>{
   let search=basket.find((x)=>x.id===id);
   document.getElementById(id).innerText=search.quantity;
   calculation();
  }
let calculation=()=>{
  document.getElementById("cartAmount").innerHTML=basket.
map((x)=>x.quantity).reduce((x,y)=>x+y,0);
}
 calculation();