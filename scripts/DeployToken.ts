// Connect to testnet and deploy the tokens

import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();


const VOTERS = [
    "0x1BfE27367178FcFa8BE2784387F10FCBFf0D6456",
    "0x6EaCc549C6378CA0506452899a1210060Ee71C20",
    "0x963625ac45cC696Ad5Fe467Ebf4d62C9542b7726",
    "0xA89a06aDe3B2Cb55971D9240f11E39bc615b7049",
];

async function main() {

    const options = {
        alchemy: process.env.ALCHEMY_API_KEY,
        infura: process.env.INFURA_API_KEY

    }
    const provider = ethers.getDefaultProvider("goerli", options);

    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");

    console.log(`Using address ${wallet.address}`);
    const signer = wallet.connect(provider);

    const tokenFactory = new MyToken__factory(signer);
    const tokenContract = await tokenFactory.deploy();
    await tokenContract.deployed();

    console.log(`Token contract deployed to ${tokenContract.address}`);

    VOTERS.forEach(async voter => {
        await tokenContract.mint(voter, ethers.utils.parseEther("1"));
    });

    VOTERS.forEach(async voter => {
        let balance = await tokenContract.balanceOf(voter);
        console.log(`${voter} has a balance of ${balance}`)
    });










}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})
