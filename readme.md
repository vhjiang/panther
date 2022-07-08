panther is an EVM simulator that executes transactions locally on a ganache-fork (updated every time a new block is mined). It was inspired by [helios](https://github.com/taarushv/helios). It's built on [ganache](https://github.com/trufflesuite/ganache).

### Start

Before start, make sure node.js and npm are installed. Then in panther's main dir:

```
> npm install # install dependencies
> node index.js # start ganache server
```

ganache server is now started running Ethereum Mainnet forked at the latest block. It will auto restart when each new block is mined. According to the log, the restart time is quick:

    logs:

    Firing off local ganache fork
    Firing off new local ganache fork @block # 15095658
    RestartGanache: 3.927ms
    Firing off new local ganache fork @block # 15095659
    RestartGanache: 4.653ms
    Firing off new local ganache fork @block # 15095660
    RestartGanache: 3.651ms
    Firing off new local ganache fork @block # 15095661
    RestartGanache: 4.194ms
    Firing off new local ganache fork @block # 15095662
    RestartGanache: 3.45ms
    Firing off new local ganache fork @block # 15095663
    RestartGanache: 3.488ms
    ... ...


### Simulation Tests

#### Send ETH using vitalik.eth's account

One of ganache's fabulous features is `unlockedAccounts`: by unlocking vitalik.eth, you have full access to his account. In `test_scripts/simulate_eth_transfer.js`, let's use vitalik's account to send you some eth:

```
> node test_scripts/simulate_eth_transfer.js
```

The log will be:

    logs:

    your previous balance: 1000000000000000000
    ======
    tx:
    {
    hash: '0x65e37e564fc831c9ef2fdf84e784c3f6575e0b1d0053a1fd9ac196cbcd36883f',
    type: 2,
    accessList: [],
    blockHash: '0xb758946803ef50990a163cdbb128fa169f5bc420decd16298c4c7e7e9aa477ac',
    blockNumber: 15099333,
    transactionIndex: 0,
    confirmations: 1,
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    gasPrice: BigNumber { _hex: '0x7dc61ab9', _isBigNumber: true },
    maxPriorityFeePerGas: BigNumber { _hex: '0x3b9aca00', _isBigNumber: true },
    maxFeePerGas: BigNumber { _hex: '0x7dc61ab9', _isBigNumber: true },
    gasLimit: BigNumber { _hex: '0x5208', _isBigNumber: true },
    to: '0x548BAa103d34Db68F98e4FA0cb90738BC5548511',
    value: BigNumber { _hex: '0x0de0b6b3a7640000', _isBigNumber: true },
    nonce: 847,
    data: '0x',
    r: '0xc84fd9d3272fcb89087d42d81e005c6c55b9594aa9ee020b13c4a29f4f66bbed',
    s: '0x070286428b663fad61e51a9b6546b4b2f56d17fdf58c2535615081972125bcde',
    v: 1,
    creates: null,
    chainId: 1337,
    wait: [Function (anonymous)]
    }
    ======
    your current balance: 2000000000000000000


#### Simulate arbitrary tx

As a front runner, we need to get arbitrary tx from mempool, rewrite some part of the tx, then simulate to check if we could get profit. Ganache can help with the simulation.

```
> node test_scripts/simulate_any_tx.js
```

The log will be as follows. Check eth balance before and after the tx to see if profitable.

    logs:
    
    your previous balance: 2505200241354634440210
    ======
    tx:
    {
    hash: '0x95c04c45d2b4983e14621d5d7e962e51bbf3122afff06d8aace7658d5e957312',
    type: 0,
    accessList: null,
    blockHash: '0x0e4348720b6126cebc2266bb15b3afcfba75bc55c0ebe0d7a38a17e096c1a432',
    blockNumber: 15099334,
    transactionIndex: 0,
    confirmations: 1,
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    gasPrice: BigNumber { _hex: '0xe8d4a51000', _isBigNumber: true },
    gasLimit: BigNumber { _hex: '0x5ec7', _isBigNumber: true },
    to: '0xE85A08Cf316F695eBE7c13736C8Cc38a7Cc3e944',
    value: BigNumber { _hex: '0x00', _isBigNumber: true },
    nonce: 848,
    data: '0x84097393000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045',
    r: '0x216e5072a9d0355983d5ed67f23e6a3780f77eb132b66b453158b97eace8356a',
    s: '0x258e7cb643790ac10998e1eab8ab99a6186b29bc17003b98c9d630e01ffc6c76',
    v: 2710,
    creates: null,
    chainId: 1337,
    wait: [Function (anonymous)]
    }
    ======
    your current balance: 2505178193354634440210
