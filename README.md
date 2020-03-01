## Display a list of Email addresses along with marital status using: 

- ES8 "Async Await" function with fetch() api.

- CSS animation and transition.

- array Map().

- array filter().


### Code execution sequence


1) async "fetchList" function is called. This function will load a random list of email addresses of non-indians from this api "https://jsonplaceholder.typicode.com/comments" using "await fetch()" and stores it in an array.

2) filter() through the above array to extract email addresses ending with "gmail.com, hotmail.com, msn.com, yahoo.com, rediffmail.com, aol.com". If length of this filtered array length is too short(<5) then show the entire list without filtering, and then modify all email addresses by inserting "@gmail.com" at the end.

3) Call "async generateIndianList" function to:

	- Load a list of Indian names from a JSON file using "await fetch()". This is a base64 encoded list of string containing names and nicknames. Convert this to readable string.

	- Store the 'names' and 'nicknames' string in seperate arrays.

	- Loop through the names array using map() and create unique email addresses that is a combination of Names, random numbers and nick names.

	- return a new object that contains the above randomly generated email addresses, gender, IsIndian (boolean)

4) Now we have 2 seperate arrays, one containing list of random email addresses(Indian) and another containing list of non-indian email addresses. Combine these 2 arrays and then shuffle it.

5) Map() through this new list of array and return a new array of objects containing random marital status associated for each email.

6) Finally, call displayList() every 300 milliseconds to show each item 1-by-1 using css animation.


### To see the Output:

1) Download or clone this repository to your local folder.

2) Go to public folder and run "main.html".
 
In case you are seeing a CORS Alert message, you will have to try any one of the below:

- Run main.js in a Node environment to make "http" requests.

- Copy the JSON data from "names.json" and assign it to an object variable in tester.js file. Now you do not need the Fetch api call to "names.json"


### Running in Node:

In the root folder(where you have main.js), open the command prompt(SHIFT + right click), and run this commad,

```
npm install
```

After installation is complete, run the command,

```
node main
```

Finally, open your browser and go to "http://localhost:3000/"
