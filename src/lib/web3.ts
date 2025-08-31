import { ethers } from 'ethers';
import { toast } from '@/components/ui/use-toast';

// Monad Testnet Configuration
export const MONAD_TESTNET = {
  chainId: '0x279F', // 10143 in hex
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: ['https://monad-testnet.rpc.org'],
  blockExplorerUrls: ['https://testnet.monadexplorer.com'],
};

// Contract Configuration
export const STAKING_CONTRACT = {
  address: '0x4779891bEd62a0C43320d55764343Cc6d8B4366f',
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "flagged",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "AddressFlagged",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "emergencyWithdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "EmergencyWithdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "Received",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isFlagged",
          "type": "bool"
        }
      ],
      "name": "setFlag",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balanceAfter",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "Staked",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "unstake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "balanceAfter",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "txId",
          "type": "bytes32"
        }
      ],
      "name": "Unstaked",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "firstStakedAt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "flagged",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "lastStakedAt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "stakedOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalStaked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "userInfo",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "staked",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isFlagged",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "firstStakeTs",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastStakeTs",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
};

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private contract: ethers.Contract | null = null;

  async connectWallet(): Promise<string | null> {
    try {
      if (!window.ethereum) {
        toast({
          title: "Wallet tidak ditemukan",
          description: "Silakan install MetaMask atau OKX Wallet",
          variant: "destructive",
        });
        return null;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Switch to Monad Testnet
      await this.switchToMonadTestnet();

      // Initialize provider and signer
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      // Initialize contract
      this.contract = new ethers.Contract(
        STAKING_CONTRACT.address,
        STAKING_CONTRACT.abi,
        this.signer
      );

      toast({
        title: "Wallet terhubung!",
        description: `Alamat: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });

      return accounts[0];
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Gagal menghubungkan wallet",
        description: error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
      return null;
    }
  }

  async switchToMonadTestnet(): Promise<void> {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_TESTNET.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MONAD_TESTNET],
          });
        } catch (addError) {
          throw addError;
        }
      } else {
        throw switchError;
      }
    }
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async getStakedBalance(address: string): Promise<string> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const stakedBalance = await this.contract.stakedOf(address);
    return ethers.formatEther(stakedBalance);
  }

  async getTotalStaked(): Promise<string> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const totalStaked = await this.contract.totalStaked();
    return ethers.formatEther(totalStaked);
  }

  async stake(amount: string): Promise<string> {
    if (!this.contract || !this.signer) throw new Error('Contract or signer not initialized');
    
    const amountWei = ethers.parseEther(amount);
    const txId = ethers.keccak256(ethers.toUtf8Bytes(`${Date.now()}-${Math.random()}`));
    
    const tx = await this.contract.stake(txId, {
      value: amountWei,
      gasLimit: 200000, // Set a reasonable gas limit
    });
    
    toast({
      title: "Transaksi dikirim",
      description: "Menunggu konfirmasi...",
    });

    const receipt = await tx.wait();
    
    toast({
      title: "Staking berhasil!",
      description: `${amount} MON telah di-stake`,
    });

    return receipt.hash;
  }

  async unstake(amount: string): Promise<string> {
    if (!this.contract || !this.signer) throw new Error('Contract or signer not initialized');
    
    const amountWei = ethers.parseEther(amount);
    const txId = ethers.keccak256(ethers.toUtf8Bytes(`${Date.now()}-${Math.random()}`));
    
    const tx = await this.contract.unstake(amountWei, txId, {
      gasLimit: 200000,
    });
    
    toast({
      title: "Transaksi dikirim",
      description: "Menunggu konfirmasi...",
    });

    const receipt = await tx.wait();
    
    toast({
      title: "Unstake berhasil!",
      description: `${amount} MON telah di-unstake`,
    });

    return receipt.hash;
  }

  async getUserInfo(address: string) {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const userInfo = await this.contract.userInfo(address);
    return {
      staked: ethers.formatEther(userInfo[0]),
      isFlagged: userInfo[1],
      firstStakeTs: Number(userInfo[2]),
      lastStakeTs: Number(userInfo[3]),
    };
  }

  isConnected(): boolean {
    return this.provider !== null && this.signer !== null && this.contract !== null;
  }
}

export const web3Service = new Web3Service();

// Extend window object for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}