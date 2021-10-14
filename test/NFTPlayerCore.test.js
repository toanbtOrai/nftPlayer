require("dotenv").config();
const { expect } = require("chai");
const { ethers } = require("hardhat");
const {NFTStorage, File} = require("nft.storage");
const fs = require("fs");

const client =  new NFTStorage({ token: process.env.NFT_STORAGE_API })
let transaction;
describe("NFTPlayerCore", function () {
  it("Upload on IPFS", async function () {
    const signer = await ethers.getSigner();
    const NFTPlayerCore = await ethers.getContractFactory("NFTPlayerCore");
    const nftPlayer = await NFTPlayerCore.deploy("NFTPlayerCore","NFTPLC");
    console.log("Deploy contract at tx https://testnet.bscscan.com/address/"+nftPlayer.address)
    await nftPlayer.deployed();

    const metadata = await client.store({
      name: 'Cong Phuong',
      description: 'Cong Phuong doi tuyen Viet Nam',
      image:new File([], "./images/CP9.jpeg",{type:'image/jpeg'})
    });
    console.log(metadata.url);
    const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");
    const transaction = await nftPlayer.mint(signer.address, metadataURI);
    console.log("Mint token at transaction at tx https://testnet.bscscan.com/tx/"+transaction.hash)
    }).timeout(40000000000);
});
