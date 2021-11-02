import React, { Component } from 'react'
import Web3 from 'web3'
import {tokenABI} from '../abi/token_abi'
import {routerABI} from '../abi/router_abi'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider);

    const accounts = await web3.eth.getAccounts()
    this.setState({ account : accounts[0]})
    let balance= await web3.eth.getBalance(this.state.account)
    this.setState({ balance : balance.toString() })

     const token = new web3.eth.Contract(tokenABI, "0x4069572e324e9A688AB48b58E1055F631CACCb2e")
     this.setState({ token })
     let tokBalance= await token.methods.balanceOf(this.state.account).call()
     this.setState({ tokBalance : tokBalance.toString() })

     const router = new web3.eth.Contract(routerABI, "0x592be3eE622702b4F7018e3d4C2e3c97980a5174")
     this.setState({ router })
     
     this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.givenProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  swapTokens = (amount) => {
    var d = new Date();
    var seconds = Math.round(d.getTime() / 1000);

    this.setState({ loading: true })
    this.state.token.methods.approve("0x592be3eE622702b4F7018e3d4C2e3c97980a5174","100000000000000000000").send({ from: this.state.account}).on('transactionHash', (hash) => {
      // this.state.router.methods.addLiquidityETH("0x4069572e324e9A688AB48b58E1055F631CACCb2e","100000000000000000000","100000000000000000000","1000000000000000000",this.state.account,seconds+500).send({ from: this.state.account , value:"1000000000000000000"}).on('transactionHash', (hash) => {
        this.state.router.methods.swapETHForExactTokens(amount, ["0xc778417e063141139fce010982780140aa0cd5ab","0x4069572e324e9A688AB48b58E1055F631CACCb2e"],this.state.account, seconds+500).send({ from: this.state.account , value: "500000000000000000"}).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
    //   })  
    })
  }

  swapEth = (amount) => {
    var d = new Date();
    var seconds = Math.round(d.getTime() / 1000);

    this.setState({ loading: true })
    this.state.token.methods.approve("0x592be3eE622702b4F7018e3d4C2e3c97980a5174","100000000000000000000").send({ from: this.state.account}).on('transactionHash', (hash) => {
      this.state.router.methods.swapTokensForExactETH(amount,"500000000000000000000",["0x4069572e324e9A688AB48b58E1055F631CACCb2e","0xc778417e063141139fce010982780140aa0cd5ab"],this.state.account,seconds+500).send({ from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      balance: '0',
      tokBalance: '0',
      router: {},
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
      tokBalance={this.state.tokBalance}
      swapTokens={this.swapTokens}
      swapEth={this.swapEth}
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
