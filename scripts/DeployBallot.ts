import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { TokenizedBallot, MyToken } from "../typechain-types";

dotenv.config();



const PROPOSALS = ["Group 1", "Group 6", "Group 3"];
const propBytes = PROPOSALS.map((el) => ethers.utils.formatBytes32String(el));

async function main() {


    const deployer = await ethers.getSigners();

    // Deploying the ERC20 token first

    const myTokenContractFactory = await ethers.getContractFactory("MyToken");
    const myTokenContract = await myTokenContractFactory.deploy();
    await myTokenContract.deployed();
    console.log(`MyToken contract was deployed at address ${myTokenContract.address}`);

    // Deploying the TokenizedBallot contract second

    const TokenizedBallotFactory = await ethers.getContractFactory("TokenizedBallot");
    const tbDeploy = await TokenizedBallotFactory.deploy(propBytes, myTokenContract.address, 0);

    const tokenizedBallot: TokenizedBallot = await tbDeploy.deployed()

    console.log(`Tokenized ballot deployed at ${tokenizedBallot.address}`)



    // give voting tokens
    // delegating voting power
    // casting votes
    // checking vote power
    // and querying results


}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})

