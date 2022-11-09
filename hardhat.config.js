require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
      chainId: 5
    },
  },
};
