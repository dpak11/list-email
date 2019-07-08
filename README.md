## Display a list of Email addresses along with marital status in Javascript(ES6, ES8) using: 

- ES8 "Async Await" function with fetch() api.

- CSS animation,transition.

- array Map().

- array filter().


# Here is the code execution sequence


1) Call "async fetchList" function. This function will first load a random list of "non-indian" names from the api "https://jsonplaceholder.typicode.com/comments" using "await fetch()" and store in an array.

2) Next, filter() through the above array and extract only those email address ending with "gmail.com, hotmail.com, msn.com, yahoo.com, rediffmail.com, aol.com". In case this array length is too short(<5) then show entire list, by replacing domain by "gmail.com" everywhere.

3) Call "async generateIndianList" function to:

	- Load a list of Indian names from a JSON file using await fetch().

	- The above name list contains base64 encoded string of names and nicknames. So needs to be converted to readable string using window.atob()

	- Split the names and nicknames string and store it in seperate arrays.

	- using map(), loop through the names array and create email addresses that is a combination of Names, random numbers and nick names.

	- return a new object that contains the above randomly generated email addresses, gender, indian(true/false)

4) Now we have 2 seperate arrays, one containing list of random email addresses(Indian) and another containing list of non-indian email addresses. Combine these 2 arrays and then use lodash's shuffle() to mix them.

5) Map() through this new list of array and return a new array of objects containing random marital status associated for each email.

6) Finally, call displayList() every 300 milliseconds to display each item in array one by one using css animation.
