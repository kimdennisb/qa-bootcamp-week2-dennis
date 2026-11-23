type Customer = {
    birthday?: Date
}
function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday: new Date() }
}

let customer = getCustomer(3)

console.log(customer?.birthday?.getFullYear())

let log: any = null;
log?.('c')