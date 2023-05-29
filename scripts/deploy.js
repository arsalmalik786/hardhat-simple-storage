// imports
const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types")
const { ethers, run, network } = require("hardhat")
// async function
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("Deploying Contract.. Please wait")
    const simpleStorage = await SimpleStorageFactory.deploy()
    simpleStorage.deployed()

    console.log(`Deployed Contract to: ${simpleStorage.address}`)

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrive()
    console.log(`Current Value is: ${currentValue}`)

    const transactionResponse = await simpleStorage.store(9)
    await transactionResponse.wait(1)
    const updateValue = await simpleStorage.retrive()
    console.log(`Updated Value is: ${updateValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying Contract please wait....")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}
// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
