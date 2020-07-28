import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { AppProps } from "next/app";
import { FirebaseCtxProvider } from "../context/firebase/firebaseCtx";
import { UserCtxProvider } from "../context/user/UserCtx";
import theme from "../src/theme";
import Layout from "../src/components/layout/Layout";
// Custom App to wrap it with context provider

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <FirebaseCtxProvider>
      <UserCtxProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserCtxProvider>
    </FirebaseCtxProvider>
  );
}