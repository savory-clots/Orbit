# Orbit

## purpose
Orbit is a small, read-only inspection tool built for the Base ecosystem. It focuses on answering a simple question: "am I connected to the correct Base network, and what does the chain currently look like?"

The tool is intentionally minimal and designed for repeatable testnet checks.

## design principles
- read-only by default
- no transaction signing
- no message signing
- all output must be verifiable via Basescan
- optimized for Base Sepolia workflows

## supported environment
network: Base Sepolia  
chainId (decimal): 84532  
explorer: https://sepolia.basescan.org  

## what orbit reads
- connected wallet address
- wallet balance in ETH
- latest block number
- block timestamp
- current gas price

all reads are performed via standard JSON-RPC calls.

## execution flow
1. connect to Coinbase Wallet
2. verify Base Sepolia chain context
3. read wallet and block state
4. print Basescan references
5. exit without side effects

## repository layout
- app/orbit.ts  
  main executable script used for inspection

- contracts/  
  solidity contracts deployed to Base Sepolia for validation:
  - OrbitPing.sol - a tiny “liveness” contract for repeatable testnet checks: emits a Ping event, stores the latest ping payload, and tracks ping coun
  - OrbitReceiptVault.sol - a minimal ETH “receipt vault” for deterministic test flows: accepts deposits tagged with a short string, records per-user totals, and allows the owner to withdraw
    
- env/  
  - sepolia.env.json - network and explorer configuration
  - 
- package.json  
  dependency manifest

- README.md  
  documentation

## usage notes
- safe to run locally or in CI
- intended for pre-production validation
- complements Base account abstraction tooling
- ideal for quick environment sanity checks

## author
github: https://github.com/savory-clots 

email: savory-clots.0o@icloud.com

twitter (x): https://x.com/cheerful_fo

## testnet deployment (base sepolia)

the following deployments are used only as validation references.

network: base sepolia  
chainId (decimal): 84532  
explorer: https://sepolia.basescan.org  

contract OrbitPing.sol address:  
0x2B7D4A9F1E6C3D8A0F5B9C2E7A1D4C6F8B3E0A9D  

deployment and verification:
- https://sepolia.basescan.org/address/0x2B7D4A9F1E6C3D8A0F5B9C2E7A1D4C6F8B3E0A9D
- https://sepolia.basescan.org/0x2B7D4A9F1E6C3D8A0F5B9C2E7A1D4C6F8B3E0A9D/0#code  

contract OrbitReceiptVault.sol address:  
0x7C1E9A4D6F0B2A8C3D5E7F9A1B4C6D8E0A2F5B7C  

deployment and verification:
- https://sepolia.basescan.org/address/0x7C1E9A4D6F0B2A8C3D5E7F9A1B4C6D8E0A2F5B7C
- https://sepolia.basescan.org/0x7C1E9A4D6F0B2A8C3D5E7F9A1B4C6D8E0A2F5B7C/0#code  

these deployments provide a controlled environment for validating base tooling and read-only onchain access prior to base mainnet usage.
