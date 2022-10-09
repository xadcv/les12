import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/TokenizedBallot"

const config: HardhatUserConfig = {
    paths: { tests: "tests" },
    solidity: "0.8.17",
};

export default config;
