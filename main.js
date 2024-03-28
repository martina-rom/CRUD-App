let name = document.getElementById("name");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood ='create';
let tmp;

// get total
function getTotal(){
    if(price.value != " "){
        let result = +price.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }else{
        total.innerHTML = " ";
        total.style.background = "#9c0404";
        
    }
    
}

//create new product
//save data in local storage
let dataProducts; 
if (localStorage.product != null){
    dataProducts= JSON.parse(localStorage.product)
}else{
    dataProducts=[];
}

submit.onclick =function() { 
    let newProduct = {
        name:name.value.toLowerCase(),
        price:price.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value.toLowerCase(),
    }  

    if (name.value != '' 
        && price.value != '' 
        && category.value != '' 
        && newProduct.count < 100){    
            if(mood === 'create'){ // create new product           
                if(newProduct.count > 1)
                { 
                    for(let i = 0; i < newProduct.count; i++){  // create more than one product
                        dataProducts.push(newProduct);
                    }
                }else{ 
                    dataProducts.push(newProduct); }  // create one product        
            }else{   
                dataProducts[ tmp ] = newProduct;  // update product
                mood = 'create';
                submit.innerHTML = 'Create';
                count.style.display = 'block';
            }
        clearInputs()
    
    // save in localstorage      
    localStorage.setItem('product',  JSON.stringify(dataProducts)  )
    showData()
}
}

// clear inputs
function clearInputs(){
    name.value=' ';
    price.value=' ';
    discount.value=' ';
    total.innerHTML=' ';
    count.value=' ';
    category.value=' ';
}

//show data
function showData(){
    getTotal()
    let table='';
    for(let i = 0; i < dataProducts.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProducts[i].name}</td>
            <td>${dataProducts[i].price}</td>
            <td>${dataProducts[i].discount}</td>
            <td>${dataProducts[i].total}</td>
            <td>${dataProducts[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btndeleteAll = document.getElementById("deleteAll");
    if(dataProducts.length> 0){
        btndeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataProducts.length}) </button>
        `
    }else{
        btndeleteAll.innerHTML = '';
    }
}
showData()


//update product
function updateProduct(i){
    name.value = dataProducts[i].name;
    price.value= dataProducts[i].price;
    discount.value= dataProducts[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataProducts[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//delete product
function deleteProduct(i){
    dataProducts.splice(i,1);
    localStorage.product = JSON.stringify(dataProducts);
    showData()
}
function deleteAll(){
    localStorage.clear() 
    dataProducts.splice(0)
    showData()
}


//search
let searchMood = 'name';

function getSearchMood(id){
    let search = document.getElementById('search');
        if(id == 'searchbyname'){
            searchMood = 'name';
            search.placeholder='Search By Name';
        }else{
            searchMood = 'category';  
            search.placeholder = 'Search By Category';        
        }
    //search.placeholder = 'Search By ' + searchMood;
    search.focus()
    search.value=' ';
    showData()
}

function searchProduct(value){
    let table = ' ';
    for(let i=0;i< dataProducts.length; i++){       
        if(searchMood == 'name'){
                if (dataProducts[i].name.includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProducts[i].name}</td>
                        <td>${dataProducts[i].price}</td>
                        <td>${dataProducts[i].discount}</td>
                        <td>${dataProducts[i].total}</td>
                        <td>${dataProducts[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                    ` 
            }       
        }
        else{
            if (dataProducts[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataProducts[i].name}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>
                ` 
            }
        } 
    }
    document.getElementById('tbody').innerHTML = table;
}

