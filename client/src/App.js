import './App.css';
import abi from './abi.json';
import React, { useState, useEffect } from 'react';;

const { ethers } = require('ethers');

const SimpleRegistryAddress = '0x6E98458A9353DeE826218AAB6db0E50123C57f71'; 

const App = () => {
  const [contract, setContract] = useState(null);
  const [entityName, setEntityName] = useState('');
  const [entityAge, setEntityAge] = useState(0);

  const [inputName, setInputName] = useState('');
  const [inputAge, setInputAge] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        // Connect to the SimpleRegistry contract
        const provider = new ethers.BrowserProvider(window.ethereum);    
        const signer = await provider.getSigner(); 
        const contract = new ethers.Contract(SimpleRegistryAddress, abi, signer);
        setContract(contract);

        // Get initial entity details
        const [name, age] = await contract.getEntityDetails();
        setEntityName(name);
        setEntityAge(age);
      } catch (error) {
        console.error('Error connecting to contract:', error.message);
      }
    };

    init();
  }, []);

  const updateEntity = async () => {
    try {
      // Ensure Metamask is connected
      if (typeof window.ethereum == 'undefined') {
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
  
      }

      // Call the update functions on the contract with user input
      await contract.updateName(inputName);
      await contract.updateAge(Number(inputAge));

      // Get updated entity details from the contract
      const [name, age] = await contract.getEntityDetails();
      setEntityName(name);
      setEntityAge(age);
    } catch (error) {
      console.error('Error updating entity:', error.message);
    }
  };

  const getEntityDetails = async () => {
    try {
      // Get entity details from contract
      const [name, age] = await contract.getEntityDetails();
      setEntityName(name);
      setEntityAge(age);
      console.log(name, age);
    } catch (error) {
      console.error('Error getting entity details:', error.message);
    }
  };

  return (
    <div className='app'>
      <h1>Simple Registry</h1>
      <p className='provide-info'>Please provide your name and age.</p>
      <div className='form'>
        <label>
          Name:
          <input type="text" placeholder='e.g: Rufus Gladness' value={inputName} onChange={(e) => setInputName(e.target.value)} required/>
        </label>
        <label>
          Age:
          <input type="number" placeholder='e.g: 32' value={inputAge} onChange={(e) => setInputAge(e.target.value)} required/>
        </label>
        <button onClick={updateEntity}>Submit</button>


        <span onClick={getEntityDetails} className='get-details-btn'>Get Details</span>
        <p className='entity-details'>{entityName && `${entityName} is ${entityAge} years old`}</p>
        
      </div>
  
        
     
    </div>
  );
};

export default App;
