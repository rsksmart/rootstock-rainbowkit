<img src="rootstock-logo.png" alt="RSK Logo" style="width:100%; height: auto;" />

# Rootstock - Rainbowkit Demo

This project is an open-source demo implementing a frontend interaction with an ERC20 smart contract deplyed on Rootstock Testnet network. It uses [RainbowKit](https://rainbowkit.com) to connect to the wallet and [wagmi](https://wagmi.sh) to interact with the smart contract.

# Branches
- **main:** This branch contains the initial/base code for the demo. Does NOT contain the complete code.
- **completed:** This branch contains the final code for the demo completed in the live presentation.

# Important sections
Next, we will explain the most important sections of the project, which enable interaction with the smart contract. To demonstrate two different ways of interacting with the smart contract, we use a `Wagmi hook` to write to the contract and a `@wagmi/core` function to read from it. However, you can also use the Wagmi hook to read from the smart contract, or vice versa.

## Wagmi Configuration
The project uses wagmi to interact with the smart contract. The configuration is done in the `src/wagmi.ts` file. This file contains the configuration to connect to the RSK Testnet network.

```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  rootstockTestnet
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    rootstockTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [rootstockTestnet] : []),
  ],
  ssr: true,
});
```

## Contract ABI
The project uses the contract ABI to interact with the smart contract. The ABI is located in the `src/pages/index.ts` file.

```typescript
const contractABI = [
  {
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
];
```
This ABI is used to interact with the smart contract. The `balanceOf` function is used to get the balance of an account and the `mint` function is used to mint tokens. This ABI contains the 2 functions we will interact with in this example, but you can add more functions if you need.

## Read Contract Function
The project uses the `readContract` function, taken from `@wagmi/core` Wagmi tool, to read the balance of an account. This function is located in the `src/pages/index.ts` file.

```typescript
const handleRetrieve = async () => {
    const balance = (await readContract(config, {
      address: contractAddress,
      abi: contractABI,
      functionName: 'balanceOf',
      args: [address],
    })) as bigint;
    console.log('balance is',balance.toString());
    setBalance(Number(balance));
  };
```

## Write Contract Function
The project uses the `writeContract` Wagmi hook function, to mint tokens. This function is located in the `src/pages/index.ts` file. This function mints the tokens to the account address and the amount specified in the input field. You must replace the `args` section with the correct logic for your dApp.

```typescript
const hadleWriteContract = async () => {
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'mint',
      args: [address, inputValue],
    })
  }
```

## Getting Started
1. Install the dependencies:

```bash
npm install
```
2. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about this stack, take a look at the following resources:

- [Rootstock](https://www.rsk.co) - Learn more about Rootstock.
- [RainbowKit Documentation](https://rainbowkit.com) - Learn how to customize your wallet connection flow.
- [wagmi Documentation](https://wagmi.sh) - Learn how to interact with Ethereum.
- [Next.js Documentation](https://nextjs.org/docs) - Learn how to build a Next.js application.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# License
This project is licensed under the terms of the MIT license.

# Disclaimer
The software provided in this GitHub repository is offered “as is,” without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
- **Testing:** The software has not undergone testing of any kind, and its functionality, accuracy, reliability, and suitability for any purpose are not guaranteed.
- **Use at Your Own Risk:** The user assumes all risks associated with the use of this software. The author(s) of this software shall not be held liable for any damages, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of or inability to use this software, even if advised of the possibility of such damages.
- **No Liability:** The author(s) of this software are not liable for any loss or damage, including without limitation, any loss of profits, business interruption, loss of information or data, or other pecuniary loss arising out of the use of or inability to use this software.
- **Sole Responsibility:** The user acknowledges that they are solely responsible for the outcome of the use of this software, including any decisions made or actions taken based on the software’s output or functionality.
- **No Endorsement:** Mention of any specific product, service, or organization does not constitute or imply endorsement by the author(s) of this software.
- **Modification and Distribution:** This software may be modified and distributed under the terms of the license provided with the software. By modifying or distributing this software, you agree to be bound by the terms of the license.
- **Assumption of Risk:** By using this software, the user acknowledges and agrees that they have read, understood, and accepted the terms of this disclaimer and assumes all risks associated with the use of this software.