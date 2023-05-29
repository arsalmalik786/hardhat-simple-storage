const { task } = require("hardhat/config")

task("block-number", "Print the current Block Number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current Block Number is: ${blockNumber}`)
    }
)

module.children = {}
