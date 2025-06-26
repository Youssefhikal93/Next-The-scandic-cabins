import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});
export const metadata = {
  title: {
    template: "%s - The Scandic Cabins ",
    default: "The Scandic Cabins",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Scandinavian mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={josefin.variable}>
      <body
        className={`  min-h-screen bg-primary-950 text-primary-100 ${josefin.className} antialiased min-h-screen flex flex-col relative `}
      >
        <Header>
          <Logo />
        </Header>
        {/* <Navigation /> */}
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
