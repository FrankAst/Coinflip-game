import "./provableAPI_0.5.sol";

pragma solidity 0.5.12;

contract UsingRandomNumber is usingProvable{

//Query inputs

uint256 delay_query = 0;
uint256 number_of_bytes = 1;
uint256 gas_limit = 200000;

//Variables&Events

uint256 public lastNumber;


event newQuery(string description);
event newRandomNumber(uint256 newNumber);
event callbackError(string description);


mapping(bytes32 => bool) ValidsIds;
mapping(address => bytes32) public TxOwner;
mapping(address => uint256) public whoseNumber;


constructor() public{
    provable_setProof(proofType_Ledger);
}

function deposit() public payable {}

function __callback(bytes32 _id, string memory result, bytes memory proof) public {
    require(ValidsIds[_id] == true && msg.sender == provable_cbAddress(), "this is another user's id"); 
    if(provable_randomDS_proofVerify__returnCode(_id, result, proof) ==0){
        uint256 NroRnd = uint256(keccak256(abi.encodePacked(result))) %2;
        whoseNumber[msg.sender] = NroRnd;
        emit newRandomNumber(NroRnd);
        delete ValidsIds[_id];
        } else {
            emit callbackError("there was an error with the proof");
        }
}    

function update() public payable{
    emit newQuery("A New query has been sent!");
    bytes32 id = provable_newRandomDSQuery(delay_query,number_of_bytes,gas_limit);
    ValidsIds[id] = true;
    TxOwner[msg.sender] = id;
    }
}
