let tg = window.Telegram.WebApp;

tg.onEvent('mainButtonClicked', function(){
    tg.sendData(JSON.stringify({action: 'mainButtonClicked'}));
});

window.addEventListener('message', function(event) {
    if (event.data.action === 'walletAddressReceived') {
        const address = event.data.address;
        document.getElementById('connectWallet').textContent = `Подключено: ${address.slice(0, 4)}...${address.slice(-4)}`;
        document.getElementById('connectWallet').style.backgroundColor = '#4CAF50';
    }
});
