const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("contract is alredy verified");
    } else {
      console.log(e);
    }
  }
};


async function main() {
  const Box = await ethers.getContractFactory("Box");
  console.log("Deploying Box...");
  const box = await upgrades.deployProxy(Box, [42], { initializer: "store" });
  await box.deployed();
  if (
    hre.network.config.chainId === 5 &&
    process.env.ETHERSCAN_API != undefined
  ) {
    await box.deployTransaction.wait(3);
    await verify(box.address, []);
  }

  console.log("Box deployed to:", box.address);
}

main();
