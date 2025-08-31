import { useState, useEffect } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { StakingInterface } from '@/components/StakingInterface';
import robotImage from '@/assets/ai-robot-mountains.jpg';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleWalletConnect = (address: string) => {
    setIsConnected(true);
    setWalletAddress(address);
  };

  // Check if wallet is already connected on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setIsConnected(true);
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.log('No wallet connected');
        }
      }
    };
    
    checkConnection();
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ 
        backgroundImage: `url(${robotImage})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-pulse-glow"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 neon-text animate-float">
            MONAD
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-4">
            AI Staking Protocol
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stake your MON tokens on the advanced Monad testnet with cutting-edge AI technology
          </p>
          
          {/* Network indicator */}
          <div className="inline-flex items-center mt-6 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-cyber-pulse mr-2"></div>
            <span className="text-sm font-medium text-cyber-blue">Monad Testnet</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wallet Connection */}
            <div className="lg:col-span-1">
              <WalletConnect
                onConnect={handleWalletConnect}
                isConnected={isConnected}
                address={walletAddress}
              />
            </div>

            {/* Staking Interface */}
            <div className="lg:col-span-2">
              <StakingInterface
                address={walletAddress || ''}
                isConnected={isConnected}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-primary/20">
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <span>Contract: 0x4779...366f</span>
            <span>•</span>
            <span>Monad Testnet</span>
            <span>•</span>
            <span>AI Powered</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
