import { Montserrat } from 'next/font/google';
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css";
import { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    template: "ecommerce",
    default: "ecommerce",
  },
  description: "ecommerce app by atmaca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <MantineProvider>
          <AuthProvider>
            <ProductProvider>
              {children}
            </ProductProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
