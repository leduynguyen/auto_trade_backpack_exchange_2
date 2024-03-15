
/////// Setting here ///////
const tradeType = 0; // 0: No limit, 1: Stop at low balance, 2: Stop after N trades
const stopUsdc = 100; // Stop trading if balance is below this amount (for tradeType 1)
const stopTradeAmount = 20; // Stop after this many trades (for tradeType 2)
const minSleep = 10; // Minimum sleep time in seconds
const maxSleep = 30; // Maximum sleep time in seconds
///////////////////////////

let counter = 0;
let totalBuy = 0;
let totalSell = 0;
clear()
console.log("\n__________START__________\n");

if (document.getElementsByClassName("border-b-2 border-accentBlue")[3].textContent !== 'Market'){
    console.log(" - Click Market trade")
    document.getElementsByClassName("flex flex-col cursor-pointer justify-center py-2")[9].click()
}

const Start = async () => {
    console.log('--------------------------')
    console.log(`Total: Buy: ${totalBuy}  |  Sell: ${totalSell}`)
    let trade_btn = document.getElementsByClassName('border-b-baseBorderMed')[0];

    console.log(` - Click tab: ${trade_btn.textContent}`);// buy/sell button
    trade_btn.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(` - Click button: ${document.getElementsByClassName('bg-baseBackgroundL1')[3].textContent}`); //max button
    document.getElementsByClassName('bg-baseBackgroundL1')[3].click(); 
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log(`   === ${trade_btn.textContent} ===`);
    if (trade_btn.textContent === 'Buy'){
        document.getElementsByClassName('bg-greenPrimaryButtonBackground ')[0].click() // Start Buy
        totalBuy++
    } else {
        document.getElementsByClassName('bg-redPrimaryButtonBackground')[0].click() // Start sell
        totalSell++
    }

    const randomNumber = Math.floor(Math.random() * (maxSleep - minSleep + 1)) + minSleep; 
    console.log(` - Waiting: ${randomNumber}s ...`);
    await new Promise(resolve => setTimeout(resolve, randomNumber * 1000));
    
    counter++;

    // Log to indicate moving to the next operation or ending session
    if (counter < stopTradeAmount) {
        console.clear();
        console.log("Proceeding to the next trade operation...");
        await Start();
    } else {
        console.log("All trade operations completed.");
    }
}

Start();
