# Indicina Spool SDK

- [Typescript](https://www.typescriptlang.org/)

## Installation

``````bash
npm i @indicina-dev/indicina-spool-sdk
``````

## Usage Example

``````bash

# Function to open the popup
IndicinaSpool.openPopup(
    'https://www.example.com/widget',
    'spool@gmail.com',
    'INDXXXX-XXXX-XXXX-XXXX'
);
  
# Function to close the popup
setTimeout(() => {
    IndicinaSpool.closePopup();
}, 5000);

# Function to handle the completion result
function handleCompletion(result) {
  console.log('Popup completed with result:', result);
  ## Your code to handle the result, e.g., update UI, make API calls, etc.
}

# Set the onComplete callback using the IndicinaSpool.onComplete method
IndicinaSpool.onComplete(handleCompletion);
``````
