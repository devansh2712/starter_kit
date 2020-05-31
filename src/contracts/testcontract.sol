//pragma solidity >=0.4.21 <0.6.0;

pragma solidity ^0.5.0;

contract testcontract {
  string memeHash;

  function set(string memory _memeHash) public {
    memeHash = _memeHash;
  }

  function get() public view returns (string memory) {
    return memeHash;
  }
}