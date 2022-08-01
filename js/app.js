// Get Eleemts
let shop_form= document.getElementById('shop_form');
const alertBox= document.getElementById('alertBox');
let product_List= document.getElementById('product_List');
let shop_update_form= document.getElementById('shop_update_form');
let single_product =document.querySelector('.single_product');




// Submit Product Add Form
shop_form.onsubmit=(e)=>{

    e.preventDefault();

    //Get form Value
   let form_data=new FormData(e.target);
   let data = Object.fromEntries(form_data.entries());
   let {name, image, price, quantity} = Object.fromEntries(form_data.entries());
   
   // Validation
   if(!name || !image || !price || !quantity){

    alertBox.innerHTML=alertMsFun('All Filds Are Required');

   }else{

        setLsData('product', data)
    alertBox.innerHTML=alertMsFun('Product Upload Success', 'success')
    e.target.reset();
    updateData();

   }


}

// Update Data
const updateData=()=>{

    let allLsData = getLsData('product');
    let list='';
    //Check Data
    if(!allLsData || allLsData == 0){

        list =`
            <tr>
                <td colspan="7" class="text-center"><h2 style="display:inline; vertical-align: middle;"><i class="fa-solid fa-magnifying-glass"></i> </h2>  No Data Pound</td>
            </tr>
        `;

    }

    // Set Data
    if(allLsData){
        let totalPrice=0;
        allLsData.map((item, index)=>{

            totalPrice += (item.price * item.quantity);
            list +=`
                <tr>
                <td>${index +1}</td>
                <td><img class="w-20" src="${item.image}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price} BDT</td>
                <td>${item.quantity}</td>
                <td> ${item.price * item.quantity} BDT</td>
                <td>
                    <a href="#singleProduct_Modal" product_index="${index}" data-bs-toggle="modal" class="btn btn-success btn-sm product_view"><i class="fa-solid fa-eye"></i></a>

                    <a href="#update_Modal" product_index="${index}" data-bs-toggle="modal" class="btn btn-warning btn-sm product_edit"><i class="fa-solid fa-pen-to-square"></i></a>
                    
                    <a href="" class="btn btn-danger btn-sm product_delete" product_index="${index}"><i class="fa-solid fa-trash-can"></i></a>
                </td>
            </tr>
            `;
        })

        list +=`
            <tr>
                <td colspan="6" class="text-end">Your Total Amount = ${totalPrice} BDT</td>
                <td></td>
            </tr>
        `;
        
    }
    product_List.innerHTML=list;
}
updateData();


// Show Single Product
product_List.onclick=(e)=>{

    e.preventDefault();

    // Show Product
    if(e.target.classList.contains('product_view')){

    // Get Product Index
    let index_product= e.target.getAttribute('product_index');

    let receiveData = getLsData('product');
    let {name, price, quantity, image}=receiveData[index_product];

    single_product.innerHTML=`
        <img class="shadow" src="${image}" alt="">
        <h2>Product Name : ${name}</h2>
        <p>Price = ${price} BDT</p>
        <p>Quantity = ${quantity}</p>
        <p>Total Amount = ${price*quantity} BDT</p>
    `;

    }
    
    if(e.target.classList.contains('product_edit')){

        // Get Product Index
    let index_product= e.target.getAttribute('product_index');

    // Get Ls Data
    let data = getLsData('product');
    let {name, price, image, quantity} = data[index_product];

    shop_update_form.innerHTML=`
    
        <div class="my-3">
        <label for="">Product Name</label>
        <input type="text" value="${name}" name="name" class="form-control">
    </div>
    <div class="my-3">
        <label for="">Product Price</label>
        <input type="text" value="${price}" name="price" class="form-control">
    </div>
    <div class="my-3">
        <label for="">Quantity</label>
        <input type="text" value="${quantity}" name="quantity" class="form-control">
    </div>
    <div class="my-3">
        <label for="">Quantity</label>
        <input type="hidden" value="${index_product}" name="index" class="form-control">
    </div>
    <div class="my-3">
        <img class="w-100" src="${image}" alt="">
    </div>
    <div class="my-3">
        <label for="">Product Image</label>
        <input type="text" value="${image}" name="image" class="form-control">
    </div>
    <div class="my-3">
        <button class="btn btn-primary w-100"><i class="fa-solid fa-check"></i> Update Now</button>
    </div>
    `;
    }

    if(e.target.classList.contains('product_delete')){

        let uPermission = confirm('Are You Sure');

        if(uPermission){
            let product_index = e.target.getAttribute('product_index');
            let data = getLsData('product');
            data.splice(product_index, 1);
            updateLsdata('product', data);
            updateData();
        }else{
            alert('Data Safe')
        }

        

    }
    

}

// Update Product Data

shop_update_form.onsubmit=(e)=>{
    e.preventDefault();

    // Get Product Update Form Data
    let updateFormData = new FormData(e.target);
    let {name, price, quantity, image, index} = Object.fromEntries(updateFormData.entries());

    let receiveLsData = getLsData('product');
    receiveLsData[index]={
        name,
        price,
        quantity,
        image
    };
    updateLsdata('product', receiveLsData);
     updateData();
}





    