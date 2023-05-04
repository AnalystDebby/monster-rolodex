import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="h-fit pb-12 bg-gradient-to-bl from-indigo-950 to-teal-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
