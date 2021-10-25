import React, { Component } from 'react'
import Web3 from 'web3'
import UniswapV2Router02 from '../periphery/build/contracts/UniswapV2Router02.json'
import WETH from '../periphery/build/contracts/WETH.json'
import Token from '../periphery/build/contracts/Token.json'

import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account : accounts[0]})
    let balance= await web3.eth.getBalance(this.state.account)
    this.setState({ balance : balance.toString() })

    const networkId = await web3.eth.net.getId()

    //load UniswapV2Router02
    const routerData = UniswapV2Router02.networks[networkId]
    if(routerData) {
      const router = new web3.eth.Contract(UniswapV2Router02.abi, routerData.address)
      this.setState({ router })
    } else {
      window.alert('UniswapV2Router02 contract not deployed to detected network.')
    }
    //load WETH
    const wethData = WETH.networks[networkId]
    if(wethData) {
      const weth = new web3.eth.Contract(WETH.abi, wethData.address)
      this.setState({ weth })
    } else {
      window.alert('WETH contract not deployed to detected network.')
    }

    //load Token
    const tokenData = Token.networks[networkId]
    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  swapTokens = (amount) => {
    var d = new Date();
    var seconds = Math.round(d.getTime() / 1000);

    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.router._address,"100000000000000000000").send({ from: this.state.account}).on('transactionHash', (hash) => {
      this.state.router.methods.addLiquidityETH(this.state.token._address,"10000000000000000000","10000000000000000000","100000000000000000",this.state.account,seconds+500).send({ from: this.state.account , value:"100000000000000000"}).on('transactionHash', (hash) => {
        this.state.router.methods.swapETHForExactTokens(amount, [this.state.weth._address,this.state.token._address],this.state.account, seconds+500).send({ from: this.state.account , value: "1000000000000000000"}).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      })  
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      balance: '0',
      router: {},
      weth: {},
      token: {},
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
      content = <p id="loader" className="text-center">Loading...</p>
    } else{
      content = <Main 
      balance={this.state.balance}
      swapTokens={this.swapTokens}
      />
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
