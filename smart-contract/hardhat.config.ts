import dotenv from 'dotenv'
dotenv.config()

import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import './tasks'

const { PRIVATE_KEY, ALCHEMY_API_KEY, NETWORK } = process.env
const hasCustomNetwork = NETWORK && NETWORK !== 'hardhat'

if (hasCustomNetwork) {
  if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY not set')
  }

  if (!ALCHEMY_API_KEY) {
    throw new Error('ALCHEMY_API_KEY not set')
  }
}

const API_TEMPLATE = 'https://{{network}}.g.alchemy.com/v2/{{key}}'

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      viaIR: false,
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: NETWORK,
  networks: {
    hardhat: {},
    // linea_testnet: {
    //   url: `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //   accounts: [process.env.PRIVATE_KEY!],
    //   // gas: 3,
    //   gasPrice: 550001000000
    // },
    ...(hasCustomNetwork
      ? {
          [NETWORK]: {
            url: API_TEMPLATE.replace('{{network}}', NETWORK).replace(
              '{{key}}',
              ALCHEMY_API_KEY!
            ),
            // uncomment to make tx go faster
            // gasPrice: 450000000000,
            accounts: [PRIVATE_KEY]
          }
        }
      : {})
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v6'
  },
  etherscan: {
    apiKey: {
      linea_testnet: process.env.LINEASCAN_API_KEY || '',
      optimisticGoerli: process.env.ETHERSCAN_API_KEY!
    },
    customChains: [
      {
        network: 'linea_testnet',
        chainId: 59140,
        urls: {
          apiURL: 'https://explorer.goerli.linea.build/api',
          browserURL: 'https://explorer.goerli.linea.build'
        }
      },
      {
        network: 'opt_goerli',
        chainId: 59140,
        urls: {
          apiURL: 'https://api-goerli-optimistic.etherscan.io/',
          browserURL: 'https://goerli-optimism.etherscan.io/'
        }
      }
    ]
  }
}

export default config
