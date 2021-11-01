import React, { Component } from 'react'
import T from '../T.png'
import eth from '../eth.png'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-5">

        <div className="card mb-4" >

          <div className="card-body"> 

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                this.props.swapTokens(amount)
              }}>
              <div>
                <label className="float-left"></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(this.props.balance, 'Ether')} <b>ETH</b>
                </span> 
              </div>
              <div className="input-group mb-4">
                
                <div className>
                  <div className="input-group-text">
                    <img src={T} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; <b>TOK</b>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-warning btn-block btn-lg"><b>SWAP TOK!</b></button>
            </form>
    

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                this.props.swapEth(amount)
              }}>
              <div>
                <label className="float-left"></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(this.props.tokBalance, 'Ether')} <b>TOK</b>
                </span> 
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0.0"
                  required
                  />
                <div className="float-left">
                  <div className="input-group-text">
                    <img src={eth} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; <b>ETH</b>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg"><b>SWAP ETH!</b></button>
            </form>
          </div>
        </div>
    
        
      </div>
    );
  }
}

export default Main;
