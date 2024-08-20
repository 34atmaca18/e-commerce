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
};

export type Productstype = {
  id?: number;
  name: string;
  info: string;
  price: number;
  image: string;
  category: string;
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