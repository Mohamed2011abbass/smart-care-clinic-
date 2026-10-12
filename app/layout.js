import "./globals.css";

export const metadata = {
  title: "Smart Care Clinic | عيادة سمارت كير",
  description: "عيادة طبية حديثة تقدم رعاية صحية متكاملة بأحدث الأجهزة وأمهر الأطباء",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}