let w_width = window.innerWidth;

function initResizeEventListener(){
    document.addEventListener('resize', (e)=>{
        w_width = e.window.innerWidth;
    });

    if(w_width <= 425){
        applyMobileChanges();
    }
}

function applyMobileChanges(){

    try {
        const all_tables_on_current_site = document.querySelectorAll('.table');
        if(all_tables_on_current_site){
            all_tables_on_current_site.forEach((el)=>{
                el.classList.add('table-sm');
            });
        }
    } catch(error){

    }

}

initResizeEventListener();
