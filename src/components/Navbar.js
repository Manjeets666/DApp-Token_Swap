import React, { Component } from 'react'
import meta_swap from '../meta_swap.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-light flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          
        >
          <img src={meta_swap} width="50" height="50" className="d-inline-block align-center" alt="" />
          &nbsp; <b>DApp Token Swap</b>

        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <big className="text-primary">
              <small id="account"><b>{this.props.account}</b></small>
            </big>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
