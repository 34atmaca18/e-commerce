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