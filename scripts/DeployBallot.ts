import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { TokenizedBallot__factory } from "../typechain-types";

dotenv.config();



const PROPOSALS = ["Group 1", "Group 6", "Group 3"];
const propBytes = PROPOSALS.map((el) => ethers.utils.formatBytes32String(el));
const TOKEN = '0xf12b227C76461F379f90801ebBd1B2Ec3cDe6CBD';

async function main() {


    const options = {
        alchemy: process.env.ALCHEMY_API_KEY,
        infura: process.env.INFURA_API_KEY

    }
    const provider = ethers.getDefaultProvider("goerli", options);

    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");

    console.log(`Using address ${wallet.address}`);
    const signer = wallet.connect(provider);

    // Deploying the TokenizedBallot contract second

    const TokenizedBallotFactory = new TokenizedBallot__factory(signer);
    const tokenizedBallot = await TokenizedBallotFactory.deploy(propBytes, TOKEN, 0);

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

