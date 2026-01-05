import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
});

export const metadata = {
    title: "mitdevy",
    description: "A basic, cozy tech blog built with Next.js.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${workSans.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}