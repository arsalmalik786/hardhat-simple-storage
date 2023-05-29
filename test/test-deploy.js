//const { beforeEach } = require("node:test")
const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", async function () {
  let SimpleStorageFactory, simpleStorage
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorageFactory.deploy()
  })

  it("it should strat with favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrive()
    const expectedValue = "0"

    //assert and expected
    assert.equal(currentValue.toString(), expectedValue)
    // expect(currentValue.toString()).to.equal(expectedValue)

    // these two lines assert and expect are the same functionality use any one of them.
  })

  it("it should store favoriote number of 9", async function () {
    const expectedValue = "9"
    const transactionResponse = await simpleStorage.store(expectedValue)
    transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrive()

    assert.equal(currentValue.toString(), expectedValue)
  })
})

// if we want to run one of specific test then use yarn hardhat test --grap store favorite number
// another way to use any of unique word in the string
// and last way to use .olny key word with it likne
//it.only("it should store favorite number of 9", async function (){})
