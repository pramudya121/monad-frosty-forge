import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, ExternalLink } from 'lucide-react';
import { web3Service } from '@/lib/web3';

interface WalletConnectProps {
  onConnect: (address: string) => void;
  isConnected: boolean;
  address: string | null;
}

export const WalletConnect = ({ onConnect, isConnected, address }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState<string>('0');

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const connectedAddress = await web3Service.connectWallet();
      if (connectedAddress) {
        onConnect(connectedAddress);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const updateBalance = async () => {
    if (address && web3Service.isConnected()) {
      try {
        const bal = await web3Service.getBalance(address);
        setBalance(bal);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      updateBalance();
      // Update balance every 10 seconds
      const interval = setInterval(updateBalance, 10000);
      return () => clearInterval(interval);
    }
  }, [isConnected, address]);

  if (isConnected && address) {
    return (
      <Card className="p-6 cyber-glow bg-card/80 backdrop-blur-sm border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary neon-text">Wallet Connected</h3>
            <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse-glow"></div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Address:</span>
              <span className="font-mono text-cyber-blue">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Balance:</span>
              <span className="font-semibold text-primary">
                {parseFloat(balance).toFixed(4)} MON
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full border-primary/30 hover:border-primary"
            onClick={() => window.open('https://testnet.monadexplorer.com', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Explorer
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 cyber-glow bg-card/80 backdrop-blur-sm border-primary/20">
      <div className="space-y-4">
        <div className="text-center">
          <Wallet className="w-12 h-12 mx-auto mb-4 text-primary animate-float" />
          <h3 className="text-lg font-semibold text-primary neon-text">Connect Wallet</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Connect your MetaMask or OKX wallet to start staking
          </p>
        </div>

        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-primary hover:bg-gradient-primary/90 cyber-glow"
        >
          {isConnecting ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Connecting...
            </div>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          Supports MetaMask & OKX Wallet on Monad Testnet
        </div>
      </div>
    </Card>
  );
};