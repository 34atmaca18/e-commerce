import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
