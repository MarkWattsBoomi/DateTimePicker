## Class Name
Chat

## Function
Displays a list of chat bubbles chronologically.

## Component Definition
There is a .component file in the project root folder to import into Flow.
It will need re-pointing to your local copy of the .js & .css files.

## Model
A list of chat items, any type.  We define which attributes map to author, date & content in the attributes.

## Label
A title to be displayed in the header bar.

## Attributes

### dateAttribute
This tells the component the name of the model attribute containing the chat item's date.

### authorAttribute
This tells the component the name of the model attribute containing the chat item's author.
It will be compared to the logged in user's email to assess it it your own chat item.

### contentAttribute
This tells the component the name of the model attribute containing the chat item's content.
