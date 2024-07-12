# web-scraping-MX

This script demonstrates web scraping using Playwright in TypeScript to fetch book data from `books.toscrape.com`.

## Prerequisites

Before you begin, ensure you have the following installed on your Windows system:

- **Node.js & npm (Node Package Manager)**:
  - Download and install from [nodejs.org](https://nodejs.org/), which includes npm.

## Installation

1. **Clone the Repository:**
   - Open Command Prompt (cmd) or PowerShell.
   - Clone the repository by running the following command:
     ```bash
     git clone <repository-url>
     cd <repository-name>
     ```

2. **Install Dependencies:**
   - Navigate to the cloned repository directory (`<repository-name>`).
   - Install dependencies by running the following command:
     ```bash
     npm install
     ```

   This command installs Playwright, TypeScript, and other necessary packages specified in `package.json`.

## Running the Script

To run the script, follow these steps:

1. **Start the Script:**
   - In Command Prompt or PowerShell, navigate to the repository directory if you're not already there.
   - Execute the following command to run the script:
     ```bash
     npx ts-node scraper.ts
     ```

2. **Follow the Instructions:**
   - The script will prompt you to enter your username and password.
   - It will then launch a Chromium browser (visible by default for debugging purposes).
   - If prompted for MFA, complete the MFA process manually and press Enter to continue.
   - The script will fetch and display the last 10 books from `books.toscrape.com`.
   - You will be prompted to enter a search string (e.g., "fiction", "poetry") to search for books.
   - The script will display the search results based on your input.

## Testing the Script

This project includes unit tests for the helper functions using Jest.

1. **Install Testing Dependencies:**
   - If not already installed, install Jest and its types:
     ```bash
     npm install --save-dev jest @types/jest ts-jest
     ```

2. **Configure Jest:**
   - Ensure you have a `jest.config.js` file with the following content:
     ```javascript
     module.exports = {
       preset: 'ts-jest',
       testEnvironment: 'node',
     };
     ```

3. **Run the Tests:**
   - Execute the following command to run the tests:
     ```bash
     npm test
     ```

## Additional Information

- **Error Handling:**
  - The script handles scenarios where no search results are found or an empty search string is entered.

- **Modifying the Script:**
  - You can modify `scraper.ts` to add more functionality or scrape data from different parts of the website.

- **Legal and Ethical Considerations:**
  - Ensure you have permission to scrape data from any website. This script uses `books.toscrape.com`, which is a demo site for educational purposes.

## Troubleshooting

- If you encounter any issues, check your network connection and ensure all dependencies are installed correctly.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests for any improvements or additional features.

## License

This project is licensed under the [MIT License](LICENSE).
