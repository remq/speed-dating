import Providers from "@frontend/components/Providers";
import "@frontend/styles/global.scss";
import { Metadata, Viewport } from "next";
import { PropsWithChildren } from "react";

export const generateViewport: () => Viewport = () => {
  return {
    initialScale: 1,
    width: "device-width",
  };
};

export const metadata: Metadata = {
  title: "Speed dating",
  description: "Meet new people.",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>
      <Providers>
        {/* <MetaData /> */}
        {children}
      </Providers>
    </body>
  </html>
);

export default RootLayout;
