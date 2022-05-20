// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Mindpay = await hre.ethers.getContractFactory("Mindpay");
  const mindpay = await Mindpay.deploy();

  await mindpay.deployed();

  console.log("Mindpay deployed to:", mindpay.address);


const LiquidityPool = await hre.ethers.getContractFactory("LiquidityPool");
const liquidityPool = await LiquidityPool.deploy();

await liquidityPool.deployed();

console.log("LiquidityPool deployed to:", liquidityPool.address);

const StakingPool = await hre.ethers.getContractFactory("StakingPool");
const stakingPool = await StakingPool.deploy(mindpay.address);

await stakingPool.deployed();

console.log("StakingPool deployed to:", stakingPool.address);

const ReservePool = await hre.ethers.getContractFactory("ReservePool");
const reservePool = await ReservePool.deploy(liquidityPool.address , stakingPool.address);

await reservePool.deployed();

console.log("ReservePool deployed to:", reservePool.address);

}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
