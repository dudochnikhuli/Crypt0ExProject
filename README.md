# Cryptocurrency Portfolio Tracker

A simple yet powerful Google Sheets solution to track your cryptocurrency investments in real-time using the CoinMarketCap API.

## Overview

This tool allows you to:
- Track cryptocurrency prices in real-time
- Calculate your portfolio value automatically
- Monitor your investment performance
- Customize your tracking preferences

## Getting Started

### Prerequisites

- A Google account
- A free CoinMarketCap API key

### Setup Guide

1. **Create a New Google Sheet**
   - Create a new spreadsheet in Google Sheets
   - Set up columns as follows:
     - Column A: Cryptocurrency Symbol (e.g., BTC, ETH, ADA)
     - Column B: Quantity Owned
     - Column C: Purchase Price (optional)
     - Column D: Purchase Date (optional)
     - Column E: Current Price (will be filled automatically)
     - Column F: Current Value (can use formula =B2*E2)

2. **Get a CoinMarketCap API Key**
   - Visit [CoinMarketCap](https://coinmarketcap.com/api/)
   - Sign up for a free account
   - Navigate to your dashboard and copy your API key

3. **Add the Script to Your Sheet**
   - Open your Google Sheet
   - Click on "Extensions" > "Apps Script"
   - Copy and paste the provided script into the editor
   - Replace `YOUR_API_KEY_HERE` with your actual CoinMarketCap API key
   - Save the script by clicking the floppy disk icon or pressing Ctrl+S

4. **Run the Script**
   - Close the Apps Script editor
   - Refresh your Google Sheet
   - A new menu item "Crypto Tracker" will appear
   - Click "Crypto Tracker" > "Update Prices"
   - Grant permissions when prompted
   - The script will fetch current prices for all cryptocurrencies listed in column A

## Usage Tips

### Adding Cryptocurrencies
1. Type the cryptocurrency symbol in column A (e.g., BTC for Bitcoin)
2. Enter the quantity you own in column B
3. Click "Crypto Tracker" > "Update Prices" to fetch the current price

### Setting Up Automatic Updates
The script includes a function to create automatic updates. To enable:

1. Open the Apps Script editor again ("Extensions" > "Apps Script")
2. In the editor, run the function `createTimeTrigger()`
3. Grant additional permissions if prompted
4. This will create an hourly update schedule

> **Note**: The free CoinMarketCap API has usage limits. Default configuration is set to hourly updates to stay within free tier limits.

### Customization Options

You can modify the script to:
- Change the columns where data is read from/written to
- Update the currency (default is USD)
- Adjust the update frequency
- Add additional crypto data points

## Troubleshooting

### Common Issues

**"Symbol not found" error**
- Verify you're using the correct symbol as listed on CoinMarketCap
- Some cryptocurrencies may have different symbols than expected

**API Key errors**
- Ensure your API key is correctly entered in the script
- Check if you've exceeded the free tier API call limits

**Script doesn't run**
- Make sure you've granted all necessary permissions
- Check the Apps Script logs for detailed error messages

### Viewing Logs

To see detailed logs for troubleshooting:
1. Open the Apps Script editor
2. Run the `updateCryptoPrices()` function manually
3. Click on "View" > "Logs"

## Advanced Features

### Portfolio Performance Tracking

Add these formulas to your sheet:

- **Daily Change**: `=(E2-OFFSET(E2,0,0,1,1))/OFFSET(E2,0,0,1,1)*100`
- **Total Portfolio Value**: `=SUM(F2:F100)` (adjust range as needed)
- **Total Profit/Loss**: `=SUM(F2:F100)-SUM(C2:C100*B2:B100)` (if tracking purchase prices)

### Data Visualization

Use Google Sheets' chart features to visualize your portfolio:
1. Select your data columns
2. Click "Insert" > "Chart"
3. Choose a chart type (pie charts work well for portfolio allocation)

## Limitations

- Free CoinMarketCap API tier has limited calls per day/month
- Script may time out when tracking a large number of cryptocurrencies
- Price updates are not real-time streaming (depends on update frequency)
- Historical data requires additional implementation

## License

This project is provided as-is for educational and personal use.

---

*Disclaimer: This tool is for informational purposes only and not financial advice. Cryptocurrency investments carry risk. Always do your own research before investing.*
