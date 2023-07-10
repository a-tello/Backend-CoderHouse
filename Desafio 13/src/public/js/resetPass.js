const pass1 = document.getElementById('pass1')
const pass2 = document.getElementById('pass2')
const btn = document.getElementById('recoveryBtn')
const form = document.getElementById("form")

const validatePassword = () => {
    if(pass1.value !== pass2.value) {
        Swal.fire({
            icon: 'error',
            title: 'Las contraseñas no coinciden',
            text: 'Por favor, revise las contraseñas',
          })
          return false
    }
    return true
}

/* const checkPrevPass = async (req, res) => {
    const userManager = new UserManager()
    const email = req.user.email
    const user = userManager.getUser({email})
    
    const match = await compareData(pass1, user.password)
    console.log(match);
} */

form.onsubmit = (e) => {
    e.preventDefault()
    if(validatePassword()) {
        form.submit()
    }
   // checkPrevPass()
}
