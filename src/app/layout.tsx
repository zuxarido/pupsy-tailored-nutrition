import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pupsy — Fresh, personalised meals for your dog",
  description:
    "Pupsy creates fresh, portion-controlled meals for your dog based on breed, age, weight and activity. Built on data. Delivered across India.",
  openGraph: {
    title: "Pupsy — Fresh, personalised meals for your dog",
    description:
      "Personalised fresh meals, portioned by breed, age, and activity. Built on data. Delivered to your door.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
