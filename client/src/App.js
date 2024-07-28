import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import img from './dr-drive-high-resolution-logo.png';
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      {/* modal was here earlier */}

      <p class= "account" style={{ color: "Black" }}>
        <br></br>
        <img src={img}  class="logo"></img>
        <h1 style={{ color: "Black" }} class="Heading">Decentralized Drive<br></br><div class="Head2">The ultimate storage solution with security</div></h1>
        <div class="account-title">Current Account<br></br><div class="account-name">{account ? account : "Not connected"}</div>
        </div>
      </p>
      <div className="App">
        <h2 class="App-title">This is a blockchain based image storage platform where you can store and share the images<br></br></h2>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        
        {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share Your Data
        </button>
        )}
        {modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )}
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;
