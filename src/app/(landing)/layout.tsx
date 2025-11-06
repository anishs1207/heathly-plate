import { Navbar, Footer } from "../_components";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
   <Navbar/>
   {children}
   <Footer/>
   </>
  );
}
