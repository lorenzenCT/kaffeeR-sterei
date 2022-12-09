import { ApiHelper } from "./classes/ApiHelper.js";

new ApiHelper().readAllProducts((data) => {
    let response = JSON.parse(data);
    let products = response.response;
    console.table(products);
    document.querySelector('#table_products').innerHTML = data;
    

    let template_table_product_entry = document.querySelector('template#productEntryTemplate');
    for(product in products){
        
    }

});
