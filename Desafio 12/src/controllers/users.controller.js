import UserManager from "../DAL/DAO/userManager.js";
import UsersRes from "../DAL/DTOs/usersRes.js";
import { transporter } from "../nodemailer.js";
import { createUser, getUser, login, updateUser } from "../services/users.services.js"
import { compareData, hashData } from "../utils.js";
import { generateToken } from "../utils/jwt.utils.js";

export const loginUser = async (req, res, next) => {
    const token = await login(req.body)
    if(token){
        res.cookie('Authorization', token.toString())
        // log para copiar al header
        console.log(token);
        return res.redirect('/views/products')
    }
    res.cookie('error', 'Usuario o contraseña incorrectos')
    res.redirect('/views/error')
     
}

export const singUpUser = async (req, res, next) => {
    const newUser = await createUser(req.body)
    if(!newUser) {
        res.cookie('error', 'El mail ya se encuentra registrado')
        return res.redirect('/views/error')
    }
    res.redirect('/views/login')
}

export const resetPassword = async(req, res, next) => {
    const user = await getUser({email: req.body.email})
    if(user){
        const token = generateToken({user}, '1h')
        const linkToken = token.toString()
        await transporter.sendMail({
            from:'AQ Tienda',
            to: user.email,
            subject: 'Reseteo de contraseña',
            text: `http://localhost:8080/views/resetPassword?token=${linkToken}`
        })
        return res.send("En su casilla de mail encontrará el link para resetear usu contraseña")
    }
    res.cookie('error', 'El mail ingresado no corresponde a ningún usuario registrado')
    res.redirect('/views/error')
}

export const updatePassword = async(req, res) => {
    const { pass1 } = req.body
    const userManager = new UserManager()
    const email = req.user.user.email
    const user = await userManager.getUser({email})
    const match = await compareData(pass1, user[0].password)

    if(match) return res.render('msj', {msj: 'La contraseña no puede coincidir con la anterior. Por favor, cambie su contraseña'})

    const hashPassword = await hashData(pass1)
    await updateUser(user[0]._id, {password: hashPassword})

    res.cookie('error', 'La contraseña fue cambiada con éxito')
    return res.redirect('/views/error')    
}

export const changeRole = async(req, res) => {
    const { uid } = req.params
    
    try {
        const user = await getUser({_id:uid})
        const role = user.role === 'Usuario' ? 'Premium' : 'Usuario'
        const updatedUser = await updateUser(uid, {role})
        const userRes = new UsersRes(updatedUser)
        const token = generateToken({...userRes})

        res.cookie('Authorization', token.toString())
        res.status(200).json({message: 'Rol cambiado con exito', updatedUser})
    } catch(err) {
        throw err
    }     
}

export const logoutUser = (req, res) => {
    res.clearCookie('Authorization')
    res.redirect('/views/login')
}