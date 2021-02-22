let web3 = new Web3(Web3.givenProvider);
var cinst;
var craninst;


$(document).ready(function(){
	//will start metamask extension
	startApp();
	$("#withdraw_funds").click(withdraw);
	$("#add_funds").click(deposit);
	$("#add_funds2").click(deposit2);
	$("#get_balance").click(balance);
	$("#get_address").click(getAddress);
	$("#set_add").click(setAddress);
});

async function startApp() { 
	
	 await ethereum.request({ method: 'eth_requestAccounts'}).then(function (accounts){
		cinst = new web3.eth.Contract(window.abi, "0x74bDc20b4C8168b8d489a671124a20C0CBcEFeEB", {from: accounts[0]});
		craninst = new web3.eth.Contract(window.abiR, "0xC264478122252fF660b787705bD188E30effab77", {from: accounts[0]});		
	});
	
}

function deposit(){
	var amount = $("#deposit_input").val();
	var config = {value: web3.utils.toWei(amount, "ether")};

	cinst.methods.deposit().send(config).
	on('confirmation', function(confirmationNmb){
		console.log("deposit done");
		alert("deposit done");
	});
}

function deposit2(){
	var amount2 = $("#deposit_input2").val();
	var config2 = {value: web3.utils.toWei(amount2, "ether")};

	craninst.methods.deposit().send(config2).
	on('confirmation', function(confirmationNmb){
		console.log("deposit done");
		alert("deposit done");
	});
}

function withdraw(){
	var wamount = $("#withdraw_input").val();
	

	cinst.methods.Withdraw(web3.utils.toWei(wamount, "ether")).send().
	on('confirmation', function(confirmationNmb){
		console.log("withdrawal done");
		alert("withdrawal done");
	});
}

function balance(){
	 var text;
	 web3.eth.getBalance("0x74bDc20b4C8168b8d489a671124a20C0CBcEFeEB").then(function(result){
		text= result;
		
	});
	web3.eth.getBalance("0xC264478122252fF660b787705bD188E30effab77").then(function(bal){
		$("#balance_output").text("coinflip: "+web3.utils.fromWei(text, "ether")+" eth ; "+ "randomNmb: "+ web3.utils.fromWei(bal,"gwei")+" gwei");
	
	});
}

function getAddress(){
	 var text2;
	 cinst.methods.getWithdrawalAddress().call()
	 .then(function(waddress){
		$("#address_output").text(waddress);
});

	 
}

function setAddress(){
	var address = $("#set_address").val();
	console.log(address);
	cinst.methods.setWAddress(address).send().
	on('confirmation', function(error,ConfNmb){
		if(error){ console.log(error);}
		else{
		console.log("Withdrawal address: ", address);
		alert("Successfuly changed");
		}
	
	});



}







