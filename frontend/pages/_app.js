import "@/styles/globals.css";
import React from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { sepolia } from "wagmi/chains";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { ProfileContextProvider } from "@/context/profile";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, provider } = configureChains(
  [sepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://eth-sepolia-public.unifra.io`,
      }),
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Decentral",
        appLogoUrl:
          "https://png.pngtree.com/png-vector/20211106/ourlarge/pngtree-pizza-pixel-png-image_4023257.png",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        metadata: {
          name: "Decentral",
          description: "Social Media for Filecoin",
          url: "",
          icons: [
            "https://png.pngtree.com/png-vector/20211106/ourlarge/pngtree-pizza-pixel-png-image_4023257.png",
          ],
        },
      },
    }),
  ],
  provider,
});

export default function App({ Component, pageProps }) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <WagmiConfig client={client}>
          <ProfileContextProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Component {...pageProps} />
            <Loader />
          </ProfileContextProvider>
        </WagmiConfig>
      ) : (
        <div className="w-[100vw] h-[100vh] flex justify-center">
          <Image
            src="https://icons.veryicon.com/png/o/system/bicolor-line-icon/loading-20.png"
            width="200"
            height="200"
            alt="loading"
            className="animate-spin w-16 h-16 my-auto"
          />
        </div>
      )}
    </>
  );
}
