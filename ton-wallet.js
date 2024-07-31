const tonConnectManifest = {
  url: 'https://angidrid23.github.io/smartdef.github.io/',
  name: 'SmartDef',
  iconUrl: 'https://angidrid23.github.io/smartdef.github.io/icon.png'
};

const connector = new TonConnectSDK.TonConnect(tonConnectManifest);

async function connectWallet() {
  try {
    await connector.connect();
    const walletAddress = await connector.getWalletInfo();
    console.log("Подключенный адрес:", walletAddress);
    return walletAddress;
  } catch (error) {
    console.error("Ошибка при подключении кошелька:", error);
    return null;
  }
}

function isWalletConnected() {
  return connector.connected;
}

// Экспортируйте эти функции, чтобы использовать их в других файлах
