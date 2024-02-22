const { expect } = require("chai");

describe("SimpleRegistry", function () {
  it("Should return the initial entity details", async function () {
    const SimpleRegistry = await ethers.getContractFactory("SimpleRegistry");
    const simpleRegistry = await SimpleRegistry.deploy("Rufus", 0);

    await simpleRegistry.deployed();
    const details = await simpleRegistry.getEntityDetails();
    expect(details._name).to.equal("Rufus");
    expect(details._age).to.equal(0);
  });

  it("Should update name", async function () {
    const SimpleRegistry = await ethers.getContractFactory("SimpleRegistry");
    const simpleRegistry = await SimpleRegistry.deploy("Rkay", 0);
    await simpleRegistry.deployed();
   
    await simpleRegistry.updateName("Gladness");

    const details = await simpleRegistry.getEntityDetails();
    expect(details._name).to.equal("Gladness");
  });

  
    it("Should update age", async function () {
      const SimpleRegistry = await ethers.getContractFactory("SimpleRegistry");
      const simpleRegistry = await SimpleRegistry.deploy("", 0);
      await simpleRegistry.deployed();

      await simpleRegistry.updateAge("16");

    const details = await simpleRegistry.getEntityDetails();
    expect(details._age).to.equal(16);
    });
});
