export default class UsersRes {
    constructor(user) {
        this.username = user.firstname[0] + user.lastname.toUpperCase() || ' '
        this.firstName = user.firstname
        this.lastName = user.lastname
        this.age = user.age
        this.email = user.email 
        this.cart = user.cart.toString()
        this.role = user.role
    }
}