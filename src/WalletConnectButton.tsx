import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnectButton = () => {
    return <ConnectButton label="Connect Wallet" chainStatus="icon" showBalance={false} />;
};

export default WalletConnectButton;
