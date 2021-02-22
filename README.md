# Coinflip-game
Basic coinflip game in ethereum. It utilizes an algorithm that will randomly pick head or tail, rewarding or punishing the player accordingly to their bet. For the random pick i used the provable oracle to get a random number off chain, the main advantage of this method is that the randomness is actually more realistic but, on the downside it has a 2 step approval and the implied time between each call.

The backend can be found in the coinflip folder. There, inside the contracts folder, lies the smart contracts: coinf.sol, random.sol, ownable.sol. Coinf.sol is where the flip coin logic takes place; random.sol provides a random number from an offchain oracle; and ownable includes the modifier OnlyOwner.
The frontend is held at cffront2.0 folder, there we have a file: index2.html, which corresponds to the game itself and it is the interface from which the user will interact with the contracts. Also, there is a folder named: ownerinterface, where we can find the html whereby the owner can interact with the contract to check balances, set addresses and withdraw eth.

The functioning of the app works as follow: first the user has to connect their metamask wallet to the website, using ropsten network. Once permission is granted, they proceed to fill the amount of eth at stake and choose their bet: Heads or Tails. At this point, i didnt add input validation since it is just a demo.
The next step is to place the bet and the first metamask window will appear asking to sign the FIRST transaction with a small fee, this is the call to random.sol which will provide us with the random number. Once that Tx is confirmed, another metamask window will show up asking for permission to send the eth we wanted to put at stake. 
Once confirmed, a little alert will tell us whether we are winners or loosers. 
The 2 step transaction might be a bit tedious considering the waiting time, but it adds a bit of extra security just in case the random.sol contract ran into a problem, preventing the user from loosing the full bet.


pd: the .secret file contains the private key, as this is just a demo i dont mind sharing it. But this file should never be public. 
