const Web3 = require('web3');
const User = artifacts.require("User");

const config = require('../truffle-config');

const devInfo = config.networks.development;
const host = devInfo.host;
const port = devInfo.port;
const account = devInfo.account;
const password = devInfo.password;

module.exports = function (deployer) {

  const web3 = new Web3(new Web3.providers.HttpProvider(`http://${host}:${port}`));

  console.log('>> Unlocking account ' + account);
  web3.eth.personal.unlockAccount(account, password, 99999);

  console.log('>> Deploying user');
  deployer.deploy(User);
};
