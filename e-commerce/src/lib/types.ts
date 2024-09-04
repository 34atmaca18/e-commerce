export type FooterLink = {
  name?: string;
  logo: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type FooterProps = {
  footerLinks: FooterSection[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  country: string;
  isAdmin?: boolean;
};

export type UserwithoutPassword = {
  id: number;
  name: string;
  email: string;
  country: string;
}

export type Productstype = {
  user_id?:number;
  id: number;
  name: string;
  info: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
}

export type cardProducts = {
  id: number;
  user_id?: number;
  name:string;
  info:string;
  price:number;
  image:string;
  quantity?:number;
  category:string;
}

export type LoginFormInputs = {
  email: string;
  password: string;
}

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  country: string;
}

export type FormState =
  | {user?:{
    id: number,
    name:string,
    email: string,
    country:string
  },
  message?: string
} | undefined;

export type SessionPayload = {
  userId: string | number;
  email: string;
  country: string;
  name: string;
  isAdmin: boolean;
  expiresAt: Date;
};