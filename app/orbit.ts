import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { createPublicClient, http, formatEther } from "viem";
import { baseSepolia } from "viem/chains";

const SETTINGS = {
  network: "Base Sepolia",
  chainId: 84532,
  rpc: "https://sepolia.base.org",
  explorer: "https://sepolia.basescan.org",
};

const walletSdk = new CoinbaseWalletSDK({
  appName: "Orbit (Built for Base)",
});

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(SETTINGS.rpc),
});

async function connect() {
  const provider = walletSdk.makeWeb3Provider(
    SETTINGS.rpc,
    SETTINGS.chainId
  );

  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];

  return accounts[0];
}

async function readContext(address: `0x${string}`) {
  const [balance, block, gasPrice] = await Promise.all([
    client.getBalance({ address }),
    client.getBlock(),
    client.getGasPrice(),
  ]);

  return {
    address,
    balanceEth: formatEther(balance),
    blockNumber: block.number,
    timestamp: block.timestamp,
    gasPrice,
  };
}

async function run() {
  console.log("orbit session start");
  console.log("network:", SETTINGS.network);
  console.log("chainId:", SETTINGS.chainId);

  const address = await connect();
  const ctx = await readContext(address);

  console.log("wallet:", ctx.address);
  console.log("balance:", ctx.balanceEth, "ETH");
  console.log("latest block:", ctx.blockNumber);
  console.log("timestamp:", ctx.timestamp);
  console.log("gas price:", ctx.gasPrice.toString());
  console.log(
    "explorer:",
    `${SETTINGS.explorer}/address/${ctx.address}`
  );

  console.log("orbit session end - read only");
}

run().catch((e) => {
  console.error("error:", e.message);
  process.exitCode = 1;
});
