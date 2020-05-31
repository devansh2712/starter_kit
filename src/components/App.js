import React, { Component } from 'react';
import logo from '../logo.png';
import Web3 from 'web3';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host:'ipfs.infura.io', port:5001, protocol:'https'})
const all = require('it-all')

class App extends Component {

  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
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

async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()

  }


  constructor(props) {
    super(props)

    this.state = {
      memeHash: '',
      contract: null,
      web3: null,
      buffer: null,
      //file:null
      account: null
    }
  }

   captureFile = (event) => {
    event.preventDefault()
    console.log('file captured')
    const file=event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer:Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
    
   }

    onSubmit = async (event) => {
    event.preventDefault()
    console.log("Submitting file to ipfs...")
  
  const data = JSON.stringify({
    link0: "1001",
    link1: "470023",
    link2: "10035",
    link3: "https://zoom.us/j/99284229358?pwd=bG1vMzNXOWs4bnEwblpWUDFLNTRUQT09",
    link4:"100043"
  })
  const ipfsHash = ipfs.add(data)
  const arr = await all(ipfsHash)

  console.info(arr)
  const loc = arr[0].cid.string
  console.log(loc)


       
    
   
}

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Test 
          </a>
        </nav>
        <div className="container-fluid mt-5"
>          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <form onSubmit ={this.onSubmit} >
                <input type='file' onChange={this.captureFile} />
                <input type='submit'/>
                </form>
                
             </div>     
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
