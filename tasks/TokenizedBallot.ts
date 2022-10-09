import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { MyToken__factory } from "../typechain-types";
import { task } from "hardhat/config";

dotenv.config();

const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: process.env.INFURA_API_KEY
};

/*
    deploy a token
*/
task("token", "Deploy a new instance of the token")
    .setAction(async () => {
        const provider = ethers.getDefaultProvider("goerli", options);

        const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");

        console.log(`Using address ${wallet.address}`);
        const signer = wallet.connect(provider);

        const tokenFactory = new MyToken__factory(signer);
        const tokenContract = await tokenFactory.deploy();
        await tokenContract.deployed();

        console.log(`Token contract deployed to ${tokenContract.address}`);
    });

/*
    @param contractAddress: address of the token
    @param destinationAddress: address to mint tokens to 
    @param mintAmount: number of tokens to mint in human readable numbers
*/
task("mint", "Mint token to provided addresses")
    .addPositionalParam("contractAddress")
    .addPositionalParam("destinationAddress")
    .addPositionalParam("mintAmount")
    .setAction(async (taskArgs) => {
        /* test addresses:
        0x963625ac45cC696Ad5Fe467Ebf4d62C9542b7726 macnum
        0xA89a06aDe3B2Cb55971D9240f11E39bc615b7049 titanium
        0x6EaCc549C6378CA0506452899a1210060Ee71C20 Nelson
        0x8078C37e6b710Ad3CCc90B0Bd999eD44d3613316 Kalote
        */

        console.log(taskArgs);

        const provider = ethers.getDefaultProvider("goerli", options);

        const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");

        console.log(`Using address ${wallet.address}`);
        const signer = wallet.connect(provider);

        const token = new MyToken__factory(signer).attach(taskArgs.contractAddress);
        const tx = await token.mint(taskArgs.destinationAddress, ethers.utils.parseEther(taskArgs.mintAmount));

        console.log({ tx: tx });
        const receipt = await tx.wait();
        console.log({ receipt: receipt });

    });


