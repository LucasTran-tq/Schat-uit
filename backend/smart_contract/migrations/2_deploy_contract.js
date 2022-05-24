const MyContract = artifacts.require('MyContract');
const UserContract = artifacts.require('UserContract');

module.exports = function (deployer) {
  deployer.deploy(MyContract);
  deployer.deploy(UserContract);
};
