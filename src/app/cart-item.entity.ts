export type CartItem = {
  id: string,
  quantity: number
  product: {
    id: string,
    name: string,
    netPrice: number,
    weight: number,
    discount: number,
  }
}
