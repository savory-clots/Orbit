// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OrbitPing {
    string public lastPayload;
    address public lastSender;
    uint256 public pingCount;

    event Ping(address indexed sender, string payload, uint256 indexed count);

    function ping(string calldata payload) external {
        lastPayload = payload;
        lastSender = msg.sender;
        pingCount += 1;
        emit Ping(msg.sender, payload, pingCount);
    }
}
