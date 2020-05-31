const test = artifacts.require("testcontract");

module.exports = function(deployer) {
  deployer.deploy(test);
};
