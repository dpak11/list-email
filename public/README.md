## Display a list of Email addresses along with marital status in JS(ES6, ES8) using: 

- ES8 "Async Await" function with fetch() api.

- CSS animation,transition.

- array Map().

- array filter().


# Here is the code execution sequence


1) First, call "async fetchList" function. This function will first load a random list of "non-indian" email addresses from the api "https://jsonplaceholder.typicode.com/comments" using "await fetch()" and stores it in an array.

2) Next, filter() through the above array and extract only those email address ending with "gmail.com, hotmail.com, msn.com, yahoo.com, rediffmail.com, aol.com". If in case this array length is too short(<5) then show the entire list without filtering, and then replace email addresses by "@gmail.com" everywhere.

3) Call "async generateIndianList" function to:

	- Load a list of Indian names from a JSON file using await fetch().

	- The above list contains base64 encoded string of names and nicknames. So convert to readable string using window.atob()

	- Split the names and nicknames string and store it in seperate arrays.

	- using map(), loop through the names array and create email addresses that is a combination of Names, random numbers and nick names.

	- return a new object that contains the above randomly generated email addresses, gender, IsIndian (true/false)

4) Now we have 2 seperate arrays, one containing list of random email addresses(Indian) and another containing list of non-indian email addresses. Combine these 2 arrays and then use lodash's shuffle() to mix them.

5) Map() through this new list of array and return a new array of objects containing random marital status associated for each email.

6) Finally, call displayList() every 300 milliseconds to display each item in array one by one using css animation.


# Output:

To see the output, just run "main.html" in your browser.
 
In case you encounter a CORS error in your browser console window, you will have to try any one of the below:

- Run it in a Node environment, or a web sever to make "http" requests. (You may use "app.js" if you are running Node server).

- Try a different browser. (Firefox might work).

- Copy the JSON data from "names.json" and assign it to an object variable in tester.js file. Now you do not need the Fetch api call to "names.json"
