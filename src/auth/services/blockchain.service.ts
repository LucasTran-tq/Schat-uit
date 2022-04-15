import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';
@Injectable()
export class BlockchainService {
  constructor() {}
  abi = [
    {
      inputs: [
        {
          internalType: 'string',
          name: '_phone',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_hoten',
          type: 'string',
        },
      ],
      name: 'add',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_phone',
          type: 'string',
        },
      ],
      name: 'get',
      outputs: [
        {
          internalType: 'string',
          name: 'phone',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'hoten',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'user',
      outputs: [
        {
          internalType: 'string',
          name: 'phone1',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'hoten1',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_phone',
          type: 'string',
        },
      ],
      name: 'userExists',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  Web3 = require('web3');
  web3 = new this.Web3(process.env.WEB3_PORT3);
  account = process.env.WEB3_ACCOUNT;
  address = process.env.WEB3_ADDRESS;
  pass = '123123aa';
  userContract = new this.web3.eth.Contract(this.abi, this.address);
  public async addUser(signup: SignupDto) {
    console.log(this.account, this.address);
    await this.web3.eth.personal.unlockAccount(this.account, this.pass, 9999);
    return this.userContract.methods
      .add(signup.phone_number, signup.user_name)
      .send({ from: this.account });
  }

  public async checkUserExtis(login: LoginDto) {
    await this.web3.eth.personal.unlockAccount(this.account, this.pass, 9999);
    return this.userContract.methods.userExists(login.phone_number).call();
  }
}
