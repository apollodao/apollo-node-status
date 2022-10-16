import type { AppProps } from "next/app";
import { Layout, NetworkMangerProvider } from "modules/common";

function ApolloApp({ Component, pageProps }: AppProps) {
  return (
    <NetworkMangerProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NetworkMangerProvider>
  );
}

export default ApolloApp;
