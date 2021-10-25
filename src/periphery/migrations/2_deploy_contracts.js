const contract = require('@truffle/contract');
const json = require("@uniswap/v2-core/build/Token.json");
const Token = contract(json);
const json1 = require('@uniswap/v2-core/build/UniswapV2Factory.json')
const UniswapV2Factory = contract(json1);
const Router = artifacts.require("UniswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");

UniswapV2Factory.setProvider(this.web3._provider);
Token.setProvider(this.web3._provider);


module.exports = async function(deployer, _network, addresses) {
	await deployer.deploy(Token,"500000000000000000000",{from: addresses[0]});

    await deployer.deploy(UniswapV2Factory, addresses[0], {from: addresses[0]});
    let factory =  await UniswapV2Factory.deployed();

	await deployer.deploy(WETH);
    let weth= await WETH.deployed();

    await deployer.deploy(Router, factory.address , weth.address);
};


