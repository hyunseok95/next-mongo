import * as React from 'react';
import 'lib/styles/globals.css'
import {AppProps} from "next/app";
import {wrapper} from "lib/store";
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {ThemeProvider} from '@mui/material/styles';
import Head from 'next/head';
import theme from "lib/styles";
import {createEmotionCache} from "lib/mui";
import MyDialog from 'view/common/dialog';
import MyAlert from 'view/common/alert';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const WrappedApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) => {

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
                <MyAlert/>
                <MyDialog />
            </ThemeProvider>
        </CacheProvider>
    );
}
export default wrapper.withRedux(WrappedApp);