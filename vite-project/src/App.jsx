import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';


const App = () => {
  const [account, setAccount] = useState(null);
  const [points, setPoints] = useState(0);

  const contractAddress = "0xdcf10b424c83b218381df8ced94407deb5a2ac9e";
  const contractABI = [
    // Your contract ABI here
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      fetchPoints(accounts[0]);

      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        fetchPoints(accounts[0]);
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } else {
      alert('Please install MetaMask!');
    }
  };

  const fetchPoints = async (userAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const userPoints = await contract.getPoints(userAddress);
    setPoints(parseInt(userPoints));
  };

  const addPoints = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.addPoints(account, 100); // 100 puan ekleme
    await tx.wait();
    fetchPoints(account); // Güncelle
    alert('100 points added!');
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          fetchPoints(accounts[0]);
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Edu Gaming Platform</h1>
        <button onClick={connectWallet}>
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </button>
        <div className="total-points">
          <p>Total Points: <span>{points}</span></p>
        </div>
      </header>

      <div className="games">
        <div className="game-card">
          <h3>Game 1</h3>
          <img src="/images/63c0278095f4a810b333323e_WEB3 GAMING-p-800.png" alt="Resim 1" />
          <p>Earn 100 points by completing this game!</p>
          <button onClick={addPoints}>Play & Earn Points</button>
        </div>

        <div className="game-card">
          <h3>Game 2</h3>
          <img src="/images/resim2.jpg" alt="Resim 2" />
          <p>Earn 150 points by completing this game!</p>
          <button onClick={addPoints}>Play & Earn Points</button>
        </div>
      </div>
    </div>
  );
};

export default App;
