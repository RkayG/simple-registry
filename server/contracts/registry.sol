// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleRegistry {
    string private entityName;
    uint private entityAge;

    constructor(string memory name, uint age) {
        entityName = name;
        entityAge = age;
    }
    // function to update entity's name
    function updateName (string memory newName) public {
        entityName = newName;
    }
    // function to update entity's name
    function updateAge (uint newAge) public {
        entityAge = newAge;
    }
    // function to retrieve the entity's name and age
    function getEntityDetails() public view returns (string memory name, uint age) {
        return (entityName, entityAge);
    }
}
