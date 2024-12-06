import React from 'react';
import { WagmiProvider, useAccount, useDisconnect, useBalance } from 'wagmi';
import { RainbowKitProvider, darkTheme, ConnectButton } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from './wagmi.config.ts';
import './App.css';

const queryClient = new QueryClient();

const WalletDetails = () => {
    const { address, isConnected, chain } = useAccount();
    const { disconnect } = useDisconnect();
    const { data: balanceData } = useBalance({ address });

    if (!isConnected) {
        return <ConnectButton />;
    }

    return (
        <div className="wallet-card">
            <div className="wallet-header">
                <h2 className="wallet-title">Wallet Connected</h2>
            </div>
            <div className="wallet-info">
                <div className="wallet-info-item">
                    <span>Address:</span>
                    <span>{address}</span>
                </div>
                <div className="wallet-info-item">
                    <span>Network:</span>
                    <span>{chain?.name || 'Unknown Network'}</span>
                </div>
                <div className="wallet-info-item">
                    <span>Balance:</span>
                    <span>{balanceData ? `${balanceData.formatted} ${balanceData.symbol}` : 'Loading...'}</span>
                </div>
            </div>
            <button onClick={() => disconnect()} className="disconnect-button">
                Disconnect Wallet
            </button>
        </div>
    );
};

const App = () => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()} modalSize="compact">
                    <div className="wallet-container">
                        <WalletDetails />
                    </div>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default App;
