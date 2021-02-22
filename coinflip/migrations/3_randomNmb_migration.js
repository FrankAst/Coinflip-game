const UsingRandomNumber = artifacts.require("UsingRandomNumber");
   
module.exports = function(deployer, network, accounts) {
       deployer.deploy(UsingRandomNumber).then(function(inst){
                inst.deposit({value: web3.utils.toWei(".1", "ether"), from: accounts[0]})
                console.log(".1 eth deposited");
        })
       .catch(function(err){
                console.log("Deploy failed: "+ err);
        });
};

