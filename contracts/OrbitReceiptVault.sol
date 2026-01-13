// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OrbitReceiptVault {
    address public owner;

    mapping(address => uint256) public totalDepositedBy;
    uint256 public totalReceived;

    event Deposited(address indexed from, uint256 amount, string tag);
    event Withdrawn(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deposit(string calldata tag) external payable {
        require(msg.value > 0, "No ETH sent");
        totalDepositedBy[msg.sender] += msg.value;
        totalReceived += msg.value;
        emit Deposited(msg.sender, msg.value, tag);
    }

    function withdraw(address payable to, uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        to.transfer(amount);
        emit Withdrawn(to, amount);
    }

    function vaultBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {
        // Accept plain ETH transfers as well
        totalDepositedBy[msg.sender] += msg.value;
        totalReceived += msg.value;
        emit Deposited(msg.sender, msg.value, "receive()");
    }
}
