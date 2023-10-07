import { ethers, network } from 'hardhat'

const verify = async (
  contractAddress: string,
  networkName: string,
  args?: any[]
) => {
  if (networkName === 'hardhat') {
    return
  }

  console.log('Verifying contract...')
  try {
    // @ts-expect-error events
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!')
    } else {
      console.log(e)
    }
  }
}

async function main () {
  const Fairlance = await ethers.deployContract('Fairlance')

  const tx = await Fairlance.waitForDeployment()
  const address = await tx.getAddress()
  console.log('Fairlance deployed to ' + address)

  verify(address, network.name, [])
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
