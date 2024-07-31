const tonConnectManifest = {
  url: 'https://angidrid23.github.io/smartdef.github.io/',
  name: 'SmartDef',
  iconUrl: 'https://angidrid23.github.io/smartdef.github.io/icon.png'
};

const connector = new TonConnectSDK.TonConnect(tonConnectManifest);

async function connectWallet() {
  try {
    const walletConnectionSource = {
      jsBridgeKey: 'tonconnect'
    };
    await connector.connect(walletConnectionSource);
    const walletInfo = await connector.getWalletInfo();
    console.log("Подключенный адрес:", walletInfo.address);
    return walletInfo.address;
  } catch (error) {
    console.error("Ошибка при подключении кошелька:", error);
    if (error.message.includes('User rejected the connection')) {
      throw new Error('Пользователь отклонил подключение');
    } else if (error.message.includes('Wallet not found')) {
      throw new Error('Кошелек не найден. Убедитесь, что у вас установлен TON кошелек');
    }
    throw error;
  }
}

function isWalletConnected() {
  return connector.connected;
}

// Экспортируйте эти функции, чтобы использовать их в других файлах
