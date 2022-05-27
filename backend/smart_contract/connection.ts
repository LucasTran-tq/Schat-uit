/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as UserContract from './build/contracts/UserContract.json';

const Web3 = require('web3');

// ? working with Infura, use some below attribute
// import * as MyContract from './build/contracts/MyContract.json';
// const Provider = require('@truffle/hdwallet-provider');
// const UserContractAddress = '0xa0C3C7C9cf9f04Bd85122f6FF9692c082F1d04B5';
// const privateKey = '496a9e1fed8bd07fa39ac4d3aa8de3e6b16e32b1270aeb967a4280afafd3bc8d';
// const infuraUrl = 'https://rinkeby.infura.io/v3/2136f6658dff4931bb92c7b5395dc8e4';

@Injectable()
export class BlockchainConnectionService {
  constructor() {}

  // public async

  // *** Easy way (Web3 + @truffle/hdwallet-provider)
  public async createUser(userId, newUser_BC): Promise<any> {
    // const provider = new Provider(privateKey, infuraUrl);

    // ? web3: provider
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');

    //
    const web3 = new Web3(provider);
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const userContract = new web3.eth.Contract(
      UserContract.abi,
      UserContract.networks[networkId] &&
        UserContract.networks[networkId].address,
    );

    const receipt = await userContract.methods
      .createUser(userId, newUser_BC.publicKey)
      .send({ from: accounts[0], gas: '1000000' });
    console.log(`Transaction Hash: ${await receipt.transactionHash}`);

    return receipt;
  }

  public async getPubKeyUser(userId): Promise<any> {
    // ? web3: provider
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');

    //
    const web3 = new Web3(provider);
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const userContract = new web3.eth.Contract(
      UserContract.abi,
      UserContract.networks[networkId] &&
        UserContract.networks[networkId].address,
    );

    // console.log(userId);

    const receipt = await userContract.methods.getUser(userId).call();

    // console.log(await receipt);
    return receipt;
  }
}
