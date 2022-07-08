const ethers = require('ethers');

// Send eth from vitalik.eth to 0x548BAa103d34Db68F98e4FA0cb90738BC5548511
const url = "http://127.0.0.1:1337";
const provider = new ethers.providers.JsonRpcProvider(url);
const signer = provider.getSigner('0xd8da6bf26964af9d7eed9e03e53415d37aa96045'); // vitalik.eth

const get_balance = async () => {
    return await provider.getBalance("0x548BAa103d34Db68F98e4FA0cb90738BC5548511") // my account
}

// Func to send from vitalik.eth to another address
const transaction = async () => {
    return await signer.sendTransaction({
        to: '0x548BAa103d34Db68F98e4FA0cb90738BC5548511', // my account
        value: '1000000000000000000'
      })
};

get_balance().then(balance => { // step 1
    console.log(balance.toString()) // balance before
    return transaction() // step 2
}).then(tx => {
    console.log(tx)
    return get_balance() // step 3
}).then(balance => 
    console.log(balance.toString()) // balance after
)