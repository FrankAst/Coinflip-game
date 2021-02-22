const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations).then(async function(inst){
	inst.deposit({value: web3.utils.toWei("0.2","ether")});
});
};
