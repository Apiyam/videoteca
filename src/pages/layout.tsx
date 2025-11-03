import Head from "next/head";
import { usePathname } from 'next/navigation';

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div>
        {children}
    </div>
  );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Head>
        <title>Burlesqa</title>
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
