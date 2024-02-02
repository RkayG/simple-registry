const { ethers } = require("hardhat");

async function main() {
  // Change the parameters with your desired values
  const name = "";
  const age = 0;

  // Deploy SimpleRegistry contract
  const SimpleRegistry = await ethers.getContractFactory("SimpleRegistry");
  const simpleRegistry = await SimpleRegistry.deploy(name, age);

  await simpleRegistry.deployed();

  console.log("SimpleRegistry contract deployed to:", simpleRegistry.address);

  // Retrieve and print the entity's details
  const entityDetails = await simpleRegistry.getEntityDetails();
  console.log("Entity Details after deployment:", entityDetails);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
