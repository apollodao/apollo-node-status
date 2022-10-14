import type { AppProps } from "next/app";
import { Layout } from "modules/common";

function ApolloApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default ApolloApp;
