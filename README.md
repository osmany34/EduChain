# EduToken - Web3 Gaming Platform

[Watch the Demo on Video](https://drive.google.com/file/d/1sUnJXjauzFU-9xgiacj6iA9YyDVtnMng/view?usp=drive_link)

EduToken is a Web3-powered gaming platform where users can earn points by playing games. The platform uses a smart contract built on Solidity for managing user points, and React.js with Ethereum for the frontend interaction.

## Smart Contract (Solidity)

The `EduToken` smart contract is written in Solidity and deployed to the Ethereum network. It allows users to add points and check their current point balance.

### Smart Contract Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EduToken {
    mapping(address => uint256) public points;

    // Event for tracking points
    event PointsAdded(address indexed user, uint256 amount);

    // Function to add points
    function addPoints(address user, uint256 amount) public {
        points[user] += amount;
        emit PointsAdded(user, amount);
    }

    // Function to get points
    function getPoints(address user) public view returns (uint256) {
        return points[user];
    }
}
