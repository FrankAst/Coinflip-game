import "./Ownable.sol";



pragma solidity 0.5.12;




contract coinflip is Ownable{

    address payable WithdrawalAddress;
    

    event wAddressChanged(address _Newaddress, address _ByWhoAddress);
    event depositDone(uint _amountDeposited);
    event winner(address _winnerAddress, uint _prizeWon); //indexed
    event loser(address _LoserAddress, uint _amountLost);
    

    function deposit() public payable{
        emit depositDone(msg.value);
    }
    
    function getBalance() public view onlyOwner returns(uint){
        return address(this).balance;
    } 

    function getWithdrawalAddress() public view onlyOwner returns(address){
        return WithdrawalAddress;
    } 

    function tossCoin(uint256 _randomNumber, string memory _bet /*,address payable randomAddress*/) public payable returns(string memory){
       
        require(msg.value < address(this).balance, "No hay fondos suficientes para pagar!");
        
        //send gas to random.sol 
        // randomAddress.transfer(500000 wei);    
        string memory result;
        uint prize = 2*msg.value;

        if(_randomNumber == 1){
            result = "Heads";
        } else {
            result = "Tails";
        
        }
        
        if(keccak256(abi.encodePacked(result)) == keccak256(abi.encodePacked(_bet))){
            msg.sender.transfer(prize);
            emit winner(msg.sender, prize);
	    
        } else {
            emit loser(msg.sender, msg.value);
	    
        }

       	
       return result; 
    }
   
    // pseudo random function.

    /*
    function randomFunction() private view returns(uint) {
        uint rand = uint(keccak256(abi.encodePacked(now)));
        return rand % 2;
                
    }
    */

    function setWAddress(address payable _owner) public onlyOwner returns(address){
        WithdrawalAddress = _owner;
        emit wAddressChanged(_owner, msg.sender);
        return WithdrawalAddress;
    }

    function Withdraw(uint _amount) public onlyOwner{
        require(address(this).balance >= _amount, "Not enough funds");
        WithdrawalAddress.transfer(_amount);

    }
    
    


}

