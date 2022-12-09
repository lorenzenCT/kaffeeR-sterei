import { ApiHelper } from "./classes/ApiHelper.js";

new ApiHelper().readAllProducts((data) => {
    let response = JSON.parse(data);
    let products = response.response;
    console.table(products);

    let table = document.querySelector('#table_products');
   
    
    let table_body = table.querySelector('tbody');
    let template_table_product_entry = document.querySelector('template#productEntryTemplate');
    let clon;
    for(let product of products){
        clon = template_table_product_entry.content.cloneNode(true);

        console.log(clon);
        console.log(clon.querySelector('[data-backend-product_id]'));

        /* set product values */
        clon.querySelector('[data-backend-product_id]').textContent = product.id;
        clon.querySelector('[data-backend-product_title]').innerHTML = product.title;
        clon.querySelector('[data-backend-product_description]').innerHTML = product.description;
        clon.querySelector('[data-backend-product_price]').innerHTML = product.price;

        table_body.appendChild(clon);
    }

});
