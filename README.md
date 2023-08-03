# Indicina Spool SDK

- [Typescript](https://www.typescriptlang.org/)

## Installation

``````bash
npm i indicina-spool-sdk
``````

## Usage Example

``````bash

# Function to open the popup
PopupSDK.openPopup(
    'https://www.example.com/widget',
    'spool@gmail.com',
);
  
# Function to close the popup
setTimeout(() => {
    PopupSDK.closePopup();
}, 5000);

# Function to handle the completion result
function handleCompletion(result) {
  console.log('Popup completed with result:', result);
  ## Your code to handle the result, e.g., update UI, make API calls, etc.
}

# Set the onComplete callback using the PopupSDK.onComplete method
PopupSDK.onComplete(handleCompletion);
``````
