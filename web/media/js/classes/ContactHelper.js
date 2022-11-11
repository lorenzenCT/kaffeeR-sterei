import { StorageHelper } from "./StorageHelper.js"

export class ContactHelper {

    initCharCounter() {
        const textarea = document.querySelector("#contact .formular .text textarea")
        const info = document.querySelector("#contact .formular .text .info")

        this.defaultCharCounter(textarea.value.length, info)
        
        textarea.addEventListener('input', (e) => {
            const len = e.target.value.length

            if (len === 512) {
                info.setAttribute("style", "color: red")
            } else {
                info.setAttribute("style", "color: white")
            }

            info.textContent = `${len}/512`
        })
    
    }

    defaultCharCounter(len, _info) {
        const info = _info || document.querySelector("#contact .formular .text .info")
        
        info.textContent = `${len}/512`
        info.setAttribute("style", "color: white")
    }

    initValidator() {
        const textarea = document.querySelector("#contact .formular .text textarea")
        const mail = document.querySelector("#contact .formular .mail input")
        const number = document.querySelector("#contact .formular .number input")
        const salutation = document.querySelector("#contact .formular .name .salutation-container select")
        const name = document.querySelector("#contact .formular .name .name-container input")
        const submit = document.querySelector("#contact .formular .submit button")
        const newsletter = document.querySelector("#contact .formular .newsletter input")

        ;[
            { type: textarea, validator: this.validateText },
            { type: mail, validator: this.validateMail },
            { type: number, validator: this.validateText }, 
            { type: salutation, validator: this.validateText }, 
            { type: name, validator: this.validateText }
        ].forEach((elem) => {
            ;["input", "change"].forEach((type) => {
                elem.type.addEventListener(type, (event) => {
                    const wrapper = event.target.parentElement
                    
                    event.preventDefault()
                    event.stopImmediatePropagation()

                    if (elem.validator(event.target.value ?? "")) {
                        this.removeInvalidClass(wrapper)
                    } else {
                        this.addInvalidClass(wrapper)
                    }
                })
            })
        })

        submit.addEventListener("click", (e) => {
            const elems = [mail, textarea, name, salutation, number] 

            elems.forEach((elem) => {
                elem.dispatchEvent(new Event("change"))
            })

            if (!document.querySelector("#contact .formular .wrapper.invalid")) {
                const storageHelper = new StorageHelper()
                const val = {
                    name: name.value,
                    salutation: salutation.value,
                    number: number.value,
                    mail: mail.value,
                    message: textarea.value
                }

                console.log("add contact form", val)

                storageHelper.storeData(
                    "contact_form",
                    mail.value,
                    val
                )

                if (newsletter.checked) {
                    storageHelper.storeNewsletterSubscriber({
                        email: mail.value,
                        firstname: name.value.split(" ")[0],
                        lastname: name.value.split(" ")[1]
                    })
                }

                elems.forEach((elem) => elem.value = "")
                this.defaultCharCounter(0)
            }
        })
    }

    validateText(text) {
        return text.length > 0
    }

    validateMail(text) {
        const format = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return format.test(text)
    }

    addInvalidClass(target) {
        target.classList.add("invalid")
    }

    removeInvalidClass(target) {
        target.classList.remove("invalid")
    }
}