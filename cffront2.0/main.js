let web3 = new Web3(Web3.givenProvider);
var cinst;
var craninst;
const cranadd = "0xC264478122252fF660b787705bD188E30effab77";






$(document).ready(function(){
	//will start metamask extension
	startApp();
	$("#bet_butt").click(startGame);
	
	
});



async function startApp() { 
	
	 await ethereum.request({ method: 'eth_requestAccounts'}).then(function (accounts){
		cinst = new web3.eth.Contract(window.abi, "0x74bDc20b4C8168b8d489a671124a20C0CBcEFeEB", {from: accounts[0]});
		craninst = new web3.eth.Contract(window.abiR, "0xC264478122252fF660b787705bD188E30effab77", {from: accounts[0]});		
		console.log(accounts[0]);
		console.log(cinst);
		console.log(craninst);
	});
	
}

function startGame(){
	
	
	craninst.methods.update().send()
		.on('confirmation', function(confirmationNumber){})
		/*.on('receipt', function(receipt){
			/*console.log(receipt.events);
		})*/.on('error', function(error){})
		.then(function(){
			var currentUser = web3.eth.accounts[0];
			/*craninst.events.newRandomNumber({filter: {user: currentUser}},
			function(error, result){*/
			
			craninst.once('newRandomNumber',{filter: {user: currentUser}}, function(error, result){	
					if(!error){
					console.log("random number is:", result.returnValues.newNumber);
					flipit(result.returnValues.newNumber);
					
					
				} else{
					console.log(error);
				}
			});
		
		});		
}	


function flipit(NroRan){
	var amount = $("#input-1").val();
	var bet = $("#input-2").val();
	console.log(amount)
	console.log(bet)	
	
	var config = {
		value: web3.utils.toWei(amount,"ether")
	}
	
	cinst.methods.tossCoin(NroRan, bet/*, cranadd*/).send(config)
		/*.on('confirmation', function(confirmationNumber){})*/
		.on('receipt', function(receipt){
			console.log(receipt.events);
			
			
			/*var account = web3.eth.accounts[0];
			cinst.once('winner',{filter: {user: account}}, function(error, event){
				if(event) {window.alert("WINNER");}
				else {
					console.log(error);
				} 
				});
			 cinst.once('loser',{filter: {user: account}}, function(error, event){
				if(event) {window.alert("LOSER HAHA!");}
				else {
					console.log(error);
				}*/


		}).on('error', function(error){})
		.then(function(){
			
			var account = web3.eth.accounts[0];
			cinst.once('winner',{filter: {user: account}}, function(error, event){
				if(event) {alert("WINNER");}
				else {
					console.log(error);
				} 
				});
			 cinst.once('loser',{filter: {user: account}}, function(error, event){
				if(event) {alert("LOSER HAHA!");}
				else {
					console.log(error);
				}

			});

	});
}














