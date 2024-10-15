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