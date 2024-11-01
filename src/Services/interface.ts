export interface Product {
  productName:string,
  category:string,
  id:string,
  productSummary:string,
  price: number,
  salesPrice: number,
  quantity: number,
  productDescription:string,
  productThumbnail:string,
  productImages: string[],
  productCode:string,
  status:string,
  createdAt:any
  numberSold:number
  }
  

  export interface Transaction {
    id:string
    amount: number;
    balance: number;
    created: Date;
    custoer: string;
    type: 'debit' | 'credit';
    userId: string;
  }
  

  export interface BankAccountDetails {
    accountName: string;        // "kingsley aldk"
    accountNumber: string;      // "1234567890"
    amount: number;             // "111111111"
    bankAddress: string;        // "2222"
    bankName: string;           // "123456"
    createdAt: Date;            // Timestamp
    holderAddress: string;      // "123456"
    narration: string;          // "111111111111"
    pin: string;                // "1234"
    routingNumber: string;      // "11111"
    swiftBicIban: string;       // "" (Empty)
    transferType: "local" | "international";  // Transfer type (fixed as "local")
    userId:string,
        userRole:string,
        id:string
        balance:number
        status:""
  }


 export interface UserLoanDetails {
    address: string;
    closed: boolean;
    createdAt: Date; // You can convert this to Date if needed.
    email: string;
    fullName: string;
    id: string;
    loanAmount: number;
    loanPurpose: string;
    phone: string;
    status: string;
    userRole: string;
    userID:string
  }


  export interface Applicationdata {
    id?: string;
    logo?: string;
    landingPageImage?: string;
    contactEmail?: string;
    phoneNumber?: string;
    address?: string;
    paymentLink?: string;
    footerBackground?: string;
    navbarBackground?: string;
    services?: string;
    userLogo?:string
    landingPageImage2:string
  }