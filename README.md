# currency-converter
# Currency Converter React App

This is a currency converter application built using React. It allows users to convert between various currencies in real-time by fetching live exchange rates from an external API. The app includes features such as swapping currencies, displaying historical exchange rate trends, managing favorite conversions, and more.

## Features

- **Real-Time Currency Conversion:** Convert currencies instantly using live exchange rates from [FreeCurrencyAPI](https://freecurrencyapi.com/).
- **Swap Currencies:** Easily swap the "From" and "To" currencies with a single click.
- **Historical Exchange Rates:** View exchange rate trends over time with interactive charts (powered by `react-chartjs-2` and `Chart.js`).
- **Favorite Currency Pairs:** Save and manage frequently used currency pairs for quick access.
- **Conversion History:** Keep a record of past conversions during the session.
- **Responsive Design:** The app is fully responsive and works seamlessly across different screen sizes.
- **Dark Mode:** Toggle between light and dark themes for a customized experience.
- **Auto-Refresh:** Automatically refresh exchange rates every 10 minutes to ensure up-to-date conversions.
- **Error Handling and Loading States:** Gracefully handle errors and display loading indicators when data is being fetched.

## Technologies Used

- **React** - A JavaScript library for building user interfaces
- **FreeCurrencyAPI** - A free currency conversion API
- **Chart.js** and **React Chart.js 2** - Used for displaying historical currency trends
- **Bootstrap** - For styling and responsiveness

## Installation

Follow these steps to install and run the app locally:

1. **Clone the Repository:**

   
   git clone https://github.com/yourusername/currency-converter-react.git
   cd currency-converter-react
Install Dependencies:

Make sure you have Node.js installed, then run:

npm install
Get Your FreeCurrencyAPI Key:

Sign up at FreeCurrencyAPI and obtain your API key.

Create a .env file in the root directory of the project and add the following line:

REACT_APP_CURRENCY_API_KEY=your_api_key_here
Run the App:

Start the development server:

npm start
Open http://localhost:3000 to view the app in your browser.

Usage
Enter the amount you want to convert.
Select the currencies you want to convert from and to using the dropdowns.
Click on the "Convert" button to get the converted value.
Use the "Swap" button to switch the "From" and "To" currencies.
Click the "Add to Favorites" button to save frequently used currency pairs for quick access.
View historical exchange rates for selected currency pairs in a line chart below the converter.
Toggle between light and dark modes using the dark mode switch button.
See your conversion history for this session at the bottom of the page.
Features in Detail
Swap Currencies: With one click, you can easily swap between the currencies you're converting.
Historical Exchange Rate Charts: View trends for the last 3 months by selecting two currencies.
Favorite Currencies: Save commonly used currency pairs for easy access.
Error Handling: If something goes wrong with the API, users will be informed via error messages.
Dark Mode: Toggle between light and dark mode for a more comfortable viewing experience.
Screenshots

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m "Added a new feature").
Push to the branch (git push origin feature-branch).
Open a pull request.
Contact
For any questions or feedback, please feel free to contact me:

Email: abin.joseph222@gmail.com
LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/abin-joseph-409226105/)
vbnet
Copy code

### How to Use

- Replace placeholder texts like `yourusername`, `your_api_key_here`, and `your-email@example.com` with your actual information.
- Add your demo link if it's hosted on a platform like Netlify, Vercel, or GitHub Pages.
- You can include actual screenshots by linking image files from your repository or an external source.

Let me know if you'd like more adjustments!
