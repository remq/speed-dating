import MetaData from "@frontend/components/MetaData";
import "@frontend/styles/global.scss";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MetaData />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default CustomApp;
