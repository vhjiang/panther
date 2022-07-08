const ganache = require("ganache")
const ethers = require("ethers")

// Infura API:
const provider = new ethers.providers.InfuraProvider("homestead", {
    projectId: "fd6b6e1b7a11464194d26f2557547a43",
    projectSecret: "6b18ba05af774338880442c47b9b6bf4"
});
const url = provider.connection.url

// QuickNode API:
// const url = "https://fragrant-green-frost.quiknode.pro/9ccea4706b2f6d1b43455815cabcfb453acaf748";
// const provider = new ethers.providers.JsonRpcProvider(url);

// Ganache server options:
const ganache_options = { 
    fork: {
        url: url,
        requestsPerSecond: 5 // the number of requests per second sent to the fork provider
    }, 
    wallet: {
        unlockedAccounts: [
            "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", // unlock vitalik.eth to impersonate :)
        ]
    }
};

// // Restart ganache server on every new block mined.
// provider.on('block', function(blockNumber) {
//     console.time('Ganache Restart Time Used')
//     server.close();
//     console.log("Firing off new local ganache fork @block #", blockNumber)
//     server = ganache.server({fork: url});
//     server.listen(1337);
//     console.timeEnd('Ganache Restart Time Used')
// });

main = () => {
    console.log("Firing off local ganache fork")
    server = ganache.server(ganache_options);
    server.listen(1337);
}

main()