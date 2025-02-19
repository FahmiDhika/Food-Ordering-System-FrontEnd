export interface IMenu {
    id: number
    uuid: string
    name: string
    price: number
    picture: string
    description: string
    category: string
    createdAt: string
    updatedAt: string
}

export interface IUser {
    idUser : number,
    uuid : string,
    name : string,
    email: string,
    password : string,
    profile_picture : string,
    role : string,
    createdAt : string,
    updatedAt : string
}

export interface ICart {
  menuName: string;
  price: number;
  quantity: number;
}


// export interface IOrder {
//     idOrder: number
//     uuid: string
//     customer: string
//     table_number: string
//     total_price: number
//     payment_met: string
//     user: IUser
//     status: string
//     createdAt : string,
//     updatedAt : string

// }

// export interface IOrder_List {
//     idOrderList: number
//     uuid: string
//     OrderId: IOrder
//     menu: IMenu
// }