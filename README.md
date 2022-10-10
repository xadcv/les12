# Week 3 project - group 6

## Install

```
npm i
npx hardhat clean
npx hardhat compile
```

_Note: if you have `Error: Cannot find module '../typechain-types'` error, open `./tasks/TokenizedBallot.ts`, comment everything (`cmd + a` / `cmd + /`), run clean + compile, then uncomment everything (same commands)_

## Order

```shell
npx hardhat token # deploy ERC20 token 0x4994B3A05035c647E5668F951B8f9c4218858683
npx hardhat mint # mint ERC20 token to specified address to vote
npx hardhat delegate # delegate voting power
npx hardhat ballot # deploy the ballot contract 0x392CE6ec5F3827bB6045fce6C43aaDe8fc5ce851
npx hardhat getvotingpower # check voting power and past voting power
npx hardhat vote # vote
```
