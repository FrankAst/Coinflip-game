const coinflip = artifacts.require("coinflip");
   
module.exports = function(deployer, network, accounts) {
       deployer.deploy(coinflip).then(function(inst){
               inst.setWAddress(accounts[0]).then(function(){
                  console.log("success");
        
        }).then(function(){
                inst.deposit({value: web3.utils.toWei(".1", "ether"), from: accounts[0]})
                console.log(".1 eth deposited");
        }).catch(function(err){
          console.log("error: "+err);
        }).catch(function(err){
                console.log("Deploy failed: "+ err);
        });
       
       });
};

