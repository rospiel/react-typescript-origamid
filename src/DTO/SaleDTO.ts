import { SaleStatusEnum } from "../enums/SaleStatusEnum";
import { TypePaymentEnum } from "../enums/TypePaymentEnum";

export type SaleDTO = {
    id: string
    name: string
    price: number
    status: SaleStatusEnum
    typePayment: TypePaymentEnum
    installments: number | null
    date: string
}