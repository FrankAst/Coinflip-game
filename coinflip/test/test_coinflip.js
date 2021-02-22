const coinflip = artifacts.require("coinflip");
const truffleAssert = require("truffle-assertions");

contract("coinflip", async function(accounts){


   before(async function(){
      inst = await coinflip.deployed();
   })


   //test deposit verification
   it("Should correctly add funds when deposited", async function(){
      let inst = await coinflip.new();
      await inst.deposit({value: web3.utils.toWei("1", "ether")});

      let balance = await inst.getBalance();
      let floatBalance = parseFloat(balance);
      
      let realBalance = await web3.eth.getBalance(inst.address);
     
      assert(floatBalance == web3.utils.toWei("1", "ether") && floatBalance == realBalance);
   });

   //test tosscoin when amout is > than balance.
   it("Should not allow the player to bet more than the current balance of the contract", async function(){
      let inst = await coinflip.new();
      await inst.deposit({value: web3.utils.toWei("1", "ether")});
      let balance = await inst.getBalance();
      console.log(balance);
      await truffleAssert.fails(inst.tossCoin("heads", {value:2*balance}), truffleAssert.ErrorType.REVERT);
   });

   //test only the owner can change the withdrawal address
   it("should only allow the owner to set the withdrawal address", async function(){
      truffleAssert.passes(inst.setWAddress(accounts[2], {from: accounts[0]}), truffleAssert.ErrorType.REVERT);
   });
   
   //test only the owner can change the withdrawal address
   it("should not allow non owner users to set a withdrawal address",async function(){
      truffleAssert.fails(inst.setWAddress(accounts[2],{from: accounts[3]}), truffleAssert.ErrorType.REVERT);
   });

   //test only the owner can withdraw funds
   it("Should allow only the owner to withdraw funds",async function(){
      await inst.deposit({value: web3.utils.toWei("1","ether")});
      truffleAssert.passes(inst.Withdraw(web3.utils.toWei("1","ether"), {from: accounts[0]}), truffleAssert.ErrorType.REVERT);
   });

   //test only the owner can withdraw funds
   it("should not let anyone else but the owner withraw funds",async function(){
      await inst.deposit({value: web3.utils.toWei("1","ether")});
      truffleAssert.fails(inst.Withdraw(web3.utils.toWei("1","ether"),{from: accounts[3]}),truffleAssert.ErrorType.REVERT);
   });

})


