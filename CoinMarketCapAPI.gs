/**
 * Cryptocurrency Portfolio Tracker
 * This script fetches real-time price data from CoinMarketCap API
 * and updates your spreadsheet with the latest cryptocurrency prices.
 */

/**
 * Main function to update cryptocurrency prices in your spreadsheet
 * Place cryptocurrency symbols in column A and the prices will be updated in column E
 */
function updateCryptoPrices() {
  try {
    // Access the active spreadsheet and sheet
    const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Configuration
    const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual CoinMarketCap API key
    const SYMBOL_COLUMN = "A";
    const PRICE_COLUMN = "E";
    const STARTING_ROW = 2; // Assuming first row is header
    const CURRENCY = "USD"; // Currency for conversion
    
    // Count rows with data in the symbol column
    const symbolData = activeSheet.getRange(`${SYMBOL_COLUMN}:${SYMBOL_COLUMN}`).getValues();
    let totalRows = 0;
    
    for (let i = 0; i < symbolData.length; i++) {
      if (symbolData[i][0] !== "") {
        totalRows++;
      } else if (i > 0 && symbolData[i-1][0] === "") {
        // Stop counting after first empty cell after data
        break;
      }
    }
    
    // API request configuration
    const requestHeaders = {
      "X-CMC_PRO_API_KEY": API_KEY,
      "Accept": "application/json"
    };
    
    const requestOptions = {
      "method": "GET",
      "headers": requestHeaders,
      "muteHttpExceptions": true
    };
    
    // Process each cryptocurrency
    for (let row = STARTING_ROW; row < totalRows; row++) {
      // Get cryptocurrency symbol
      const cryptoSymbol = activeSheet.getRange(`${SYMBOL_COLUMN}${row}`).getValue();
      
      if (!cryptoSymbol) continue; // Skip empty cells
      
      // Construct API request URL
      const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cryptoSymbol}&convert=${CURRENCY}`;
      
      // Make API request
      const response = UrlFetchApp.fetch(apiUrl, requestOptions);
      const statusCode = response.getResponseCode();
      
      if (statusCode === 200) {
        const responseData = JSON.parse(response.getContentText());
        
        // Check if data exists for the symbol
        if (responseData.data && responseData.data[cryptoSymbol]) {
          const price = responseData.data[cryptoSymbol].quote[CURRENCY].price;
          activeSheet.getRange(`${PRICE_COLUMN}${row}`).setValue(price);
          
          // Log success
          Logger.log(`Updated price for ${cryptoSymbol}: ${price} ${CURRENCY}`);
        } else {
          // Symbol not found
          activeSheet.getRange(`${PRICE_COLUMN}${row}`).setValue("Symbol not found");
          Logger.log(`Symbol not found: ${cryptoSymbol}`);
        }
      } else {
        // API error
        activeSheet.getRange(`${PRICE_COLUMN}${row}`).setValue("API Error");
        Logger.log(`API Error for ${cryptoSymbol}: ${response.getContentText()}`);
      }
      
      // Add small delay to avoid API rate limiting
      Utilities.sleep(500);
    }
    
    // Update timestamp
    const updateTime = new Date();
    activeSheet.getRange("G1").setValue("Last Updated: " + updateTime.toLocaleString());
    
  } catch (error) {
    Logger.log(`Error in updateCryptoPrices: ${error.message}`);
  }
}

/**
 * Create a menu button to run the update function
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Crypto Tracker')
    .addItem('Update Prices', 'updateCryptoPrices')
    .addToUi();
}

/**
 * Set up a trigger to automatically update prices on a schedule
 * Default is hourly updates
 */
function createTimeTrigger() {
  // Delete any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'updateCryptoPrices') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Create new hourly trigger
  ScriptApp.newTrigger('updateCryptoPrices')
    .timeBased()
    .everyHours(1)
    .create();
}
