import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { web3Service } from '@/lib/web3';
import { toast } from '@/components/ui/use-toast';

interface StakingInterfaceProps {
  address: string;
  isConnected: boolean;
}

export const StakingInterface = ({ address, isConnected }: StakingInterfaceProps) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [totalStaked, setTotalStaked] = useState('0');
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);

  const updateBalances = async () => {
    if (!isConnected || !address) return;

    try {
      const [staked, total, info] = await Promise.all([
        web3Service.getStakedBalance(address),
        web3Service.getTotalStaked(),
        web3Service.getUserInfo(address),
      ]);

      setStakedBalance(staked);
      setTotalStaked(total);
      setUserInfo(info);
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      updateBalances();
      // Update every 15 seconds
      const interval = setInterval(updateBalances, 15000);
      return () => clearInterval(interval);
    }
  }, [isConnected, address]);

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Error",
        description: "Masukkan jumlah yang valid",
        variant: "destructive",
      });
      return;
    }

    setIsStaking(true);
    try {
      await web3Service.stake(stakeAmount);
      setStakeAmount('');
      await updateBalances();
    } catch (error: any) {
      console.error('Staking failed:', error);
      toast({
        title: "Staking gagal",
        description: error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast({
        title: "Error",
        description: "Masukkan jumlah yang valid",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(unstakeAmount) > parseFloat(stakedBalance)) {
      toast({
        title: "Error",
        description: "Jumlah melebihi saldo yang di-stake",
        variant: "destructive",
      });
      return;
    }

    setIsUnstaking(true);
    try {
      await web3Service.unstake(unstakeAmount);
      setUnstakeAmount('');
      await updateBalances();
    } catch (error: any) {
      console.error('Unstaking failed:', error);
      toast({
        title: "Unstaking gagal",
        description: error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsUnstaking(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="p-8 cyber-glow bg-card/80 backdrop-blur-sm border-primary/20">
        <div className="text-center text-muted-foreground">
          Hubungkan wallet untuk mengakses fitur staking
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 cyber-glow bg-card/80 backdrop-blur-sm border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your Staked</p>
              <p className="text-lg font-semibold text-primary">
                {parseFloat(stakedBalance).toFixed(4)} MON
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 cyber-glow bg-card/80 backdrop-blur-sm border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Staked</p>
              <p className="text-lg font-semibold text-accent">
                {parseFloat(totalStaked).toFixed(2)} MON
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 cyber-glow bg-card/80 backdrop-blur-sm border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyber-blue/20 rounded-lg">
              <Clock className="w-5 h-5 text-cyber-blue" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Stake</p>
              <p className="text-lg font-semibold text-cyber-blue">
                {userInfo?.lastStakeTs ? 
                  new Date(userInfo.lastStakeTs * 1000).toLocaleDateString() : 
                  'Never'
                }
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Staking Interface */}
      <Card className="p-6 cyber-glow bg-card/80 backdrop-blur-sm border-primary/20">
        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="stake" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="w-4 h-4 mr-2" />
              Stake
            </TabsTrigger>
            <TabsTrigger value="unstake" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingDown className="w-4 h-4 mr-2" />
              Unstake
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="stake-amount" className="text-sm font-medium">
                Amount to Stake (MON)
              </Label>
              <Input
                id="stake-amount"
                type="number"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="bg-input/50 border-primary/30 focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                Minimum: 0.001 MON
              </p>
            </div>

            <Button
              onClick={handleStake}
              disabled={isStaking || !stakeAmount}
              className="w-full bg-gradient-primary hover:bg-gradient-primary/90 cyber-glow"
            >
              {isStaking ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Staking...
                </div>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Stake MON
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="unstake" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="unstake-amount" className="text-sm font-medium">
                Amount to Unstake (MON)
              </Label>
              <Input
                id="unstake-amount"
                type="number"
                placeholder="0.0"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="bg-input/50 border-primary/30 focus:border-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Available: {parseFloat(stakedBalance).toFixed(4)} MON</span>
                <button
                  className="text-primary hover:text-primary/80"
                  onClick={() => setUnstakeAmount(stakedBalance)}
                >
                  Max
                </button>
              </div>
            </div>

            <Button
              onClick={handleUnstake}
              disabled={isUnstaking || !unstakeAmount || parseFloat(stakedBalance) === 0}
              className="w-full bg-destructive/90 hover:bg-destructive cyber-glow"
            >
              {isUnstaking ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Unstaking...
                </div>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Unstake MON
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};