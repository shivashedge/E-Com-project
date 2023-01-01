export interface SignUp {
  fName: string;
  lName:string
  password: string;
  email: string;
  id:number
}

export interface login {
  email: string;
  password: string;
}

export interface product{
  productName:string;
  productPrice:number;
  productCategory:string;
  productColor:string;
  productDescription:string;
  productImgURL:string;
  id:number;
  quantity:undefined|number;
  productId:undefined|number;
}

export interface cart{
  productName:string;
  productPrice:number;
  productCategory:string;
  productColor:string;
  productDescription:string;
  productImgURL:string;
  id:number|undefined;
  quantity:undefined|number;
  userId:number;
  productId:number;
}

export interface priceSummary{
  cartAmount:number;
  discount:number;
  delivary:number;
  tax:number;
  total:number;
}
export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: number;
  id:number|undefined;
}