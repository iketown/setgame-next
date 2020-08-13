import React from "react";
import * as Sentry from "@sentry/node";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { AppProps } from "next/app";
import Layout from "@components/layout/Layout";
import { FirebaseCtxProvider } from "@context/firebase/firebaseCtx";
import { UserCtxProvider } from "@context/user/UserCtx";
import theme from "../src/theme";
import "./fonts.css";
// Custom App to wrap it with context provider

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

export const App: React.FC<AppProps> = ({ Component, pageProps }) => {
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
};

export default App;
