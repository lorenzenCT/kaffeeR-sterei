let events_div = document.querySelector('.events')

if(events_div){
    let buttons = events_div.querySelectorAll('button [data-bs-target="#signUpModal"]');
    let signUpModal = document.querySelector('#signUpModal')

    let title, description, date;
    buttons.forEach((el)=>{
        el.addEventListener('click', (e)=>{

            updateSignUpModal(signUpModal, {
                title,
                description,
                date
            });
        });
    });
}

function updateSignUpModal(modal, valuesObject){
    modal.querySelector('[data-template-role="signup_title"]').innerHTML = valuesObject.title;
    modal.querySelector('[data-template-role="signup_description"]').innerHTML = valuesObject.description;
    modal.querySelector('[data-template-role="signup_date"]').innerHTML = valuesObject.date;
}