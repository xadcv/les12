import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN_MINT = ethers.utils.parseEther("2");


async function main() {
    const [deployer, acc1, acc2] = await ethers.getSigners();
    const myTokenContractFactory = await ethers.getContractFactory("MyToken");
    const myTokenContract = await myTokenContractFactory.deploy();
    await myTokenContract.deployed();
    console.log(`MyToken contract was deployed at address ${myTokenContract.address}`);

    const totalSupply = await myTokenContract.totalSupply();
    console.log(`At deployment, this contract has a totalSupply of ${totalSupply} tokens`);

    const initialVotes = await myTokenContract.getVotes(acc1.address);
    console.log(`At deployment, acc1 has a voting power of ${initialVotes} tokens`);

    const mintTx = await myTokenContract.mint(acc1.address, TOKEN_MINT);
    await mintTx.wait();

    const totalSupplyAfter = await myTokenContract.totalSupply();

    console.log(`After minting, this contract has a totalSupply of ${ethers.utils.formatEther(totalSupplyAfter)} tokens`);

    const acc1Balance = await myTokenContract.balanceOf(acc1.address);
    console.log(`After minting, acc1 balance has a balanceOf of ${ethers.utils.formatEther(acc1Balance)} tokens`);

    const afterVotes = await myTokenContract.getVotes(acc1.address);
    console.log(`After minting, acc1 has a voting power of ${afterVotes} tokens`);

    const delegateTx = await myTokenContract.connect(acc1).delegate(acc1.address);
    await delegateTx.wait();

    const afterDelegate = await myTokenContract.getVotes(acc1.address);
    console.log(`After delegating, acc1 has a voting power of ${ethers.utils.formatEther(afterDelegate)} tokens`);

    const currentBlock = await ethers.provider.getBlock("latest");
    console.log(`The current block number is ${currentBlock.number}`);
    const mintTx2 = await myTokenContract.mint(acc1.address, 0);
    await mintTx2.wait();

    const currentBlock2 = await ethers.provider.getBlock("latest");
    console.log(`The current block number is ${currentBlock2.number}`);
    const mintTx3 = await myTokenContract.mint(acc1.address, 0);
    await mintTx3.wait();

    const currentBlock3 = await ethers.provider.getBlock("latest");
    console.log(`The current block number is ${currentBlock3.number}`);
    const mintTx4 = await myTokenContract.mint(acc1.address, 0);
    await mintTx4.wait();

    const pastVote = await Promise.all([

        myTokenContract.getPastVotes(acc1.address, 4),
        myTokenContract.getPastVotes(acc1.address, 3),
        myTokenContract.getPastVotes(acc1.address, 2),
        myTokenContract.getPastVotes(acc1.address, 1),
        myTokenContract.getPastVotes(acc1.address, 0),
    ]);
    console.log(pastVote);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})
