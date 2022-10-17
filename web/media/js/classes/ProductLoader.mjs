import products from "../../products.json" assert { type: 'json' }

export class ProductLoader {

    static load() {
        let result = ""

        products.forEach((value) => {
            result += `
<div id="product-item-${value.id}" class="item col mb-5">
    <div class="display">
        <img src="${value.img}" alt="">
    </div>
    <div class="information">
        <div class="default-information">
            <h5>${value.name}</h5>
            <p>${value.price} / ${value.amount}</p>
            <p>${value.flavour}</p>
        </div>
        <div id="additional-information-${value.id}" class="additional-information collapse">
            <p${Number(value.stock) < 20 ? ' style="color: red;"' : ' style="color: green;"'}>${value.stock} verfügbar</p>
        </div>
        <div class="more-information">
	    <a data-bs-toggle="collapse" href="#additional-information-${value.id}" role="button" aria-expanded="false" aria-controls="additional-information" class="btn btn-outline-dark mt-auto">
	    	<span class="collapsed">Mehr</span>
		<span class="expanded">Weniger</span>
	    </a>
        </div>
    </div>
</div>
            `
        })

        document.querySelector("#main .items").innerHTML = result
        this.addListeners()
    }

    static addListeners() {
        const buttons = document.querySelectorAll("#main .items .item .information .more-information button")
	buttons = []
        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const button = event.target 
                const information = button.parentElement.parentElement
                const hiddenContainer = information.childNodes[3] 
    
                if (hiddenContainer.style.display === 'none') {
                    hiddenContainer.style.display = "flex"
                    button.parentElement.style["padding-top"] = '1.5em'
                    button.innerHTML = "Weniger"
                } else {
                    hiddenContainer.style.display = "none"
                    button.parentElement.style["padding-top"] = '0'
                    button.innerHTML = "Mehr"
                }
            })
        })
    }
}
