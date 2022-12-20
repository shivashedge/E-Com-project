export interface SignUp {
  fName: string;
  lName:string
  password: string;
  email: string;
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
  id:number
}
