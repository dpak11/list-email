/*jshint esversion: 6 */
/*jshint esversion: 8 */

let peopleList = [];
let displayprocess = true;
const initDisplay = {
    status: { all: "", s: "Single", sm: "Single Mother", sf: "Single Father", m: "Married", d: "Divorced", w: "Widow", wr: "Widower" },
    disp: function(l) {
        setTimeout(function() {
            document.getElementById("results").innerHTML = "";
            displayprocess = true;
            displayList(l, 0);
        }, 1000);
    },
    filter: function() {
        displayprocess = false;
        let loc = document.getElementById("loc").value;
        let isIndian = loc == "indian" ? true : loc == "other" ? false : loc;
        let status = this.status[document.getElementById("maritals").value];
        if (status == "" && loc == "all") {
            this.disp(peopleList);
        } else {
            let ppl = peopleList.filter((p) => {
                if (status == "" && isIndian != "all") { return p.indian === isIndian; }
                if (status != "" && isIndian == "all") { return p.status === status; }
                return (p.status === status && p.indian === isIndian);
            });
            this.disp(ppl);
        }
    }
};

function displayList(people, num) {
    if (displayprocess) {
        if ((people.length - 1) > num) {
            let numb = num + 1;
            setTimeout(() => {
                let para = document.createElement("p");
                let ind = people[num].indian ? '<span class="ind-marker">IND</span>' : ' ';
                para.innerHTML = `${ind} <span class="e_mail">${people[num].email}</span> <span class="status">${people[num].status}</span>`;
                let resultElt = document.getElementById("results");
                resultElt.appendChild(para);
                para.classList.add("showup");
                para.setAttribute("data-gender", people[num].gender);
                displayList(people, numb);
            }, 300);
        }

    }

}

function getRandom(num){
    return Math.floor(Math.random() * num);
}

function shuffleList(items){
    let newList = [];
    let itemLength = items.length;
    for(let i=0; i<itemLength; i++){
        let extracted = items.splice(getRandom(items.length),1);
        newList.push(extracted[0]);
    }
    return newList;
}
function generateRandomEmail(names, nicks, gender) {
    let domainList = ["hotmail.com", "yahoo.com", "msn.com", "gmail.com", "aol.com", "rediffmail.com", "ymail.com", "outlook.com"];
    return names.map((name) => {
        let randomiser = getRandom(6);
        let new_name = "";
        if (name.length < 5) {
            new_name = randomiser > 3 ? name + "_" + nicks[getRandom(10)] + "_" + (1000 + getRandom(9000)) : name + "19" + (getRandom(40) + 60) + nicks[getRandom(10)]            
        } else {
            if (randomiser == 0) { new_name = name.substr(0, 4) + "19" + (getRandom(40) + 60) + "_" + (1000 + getRandom(9000)) }
            if (randomiser == 1) { new_name = name.substr(0, 4) + "" + (getRandom(40) + 60) + "_" + (1000 + getRandom(9000)) }
            if (randomiser == 2) { new_name = name + "19" + (getRandom(40) + 60) }
            if (randomiser == 3) { new_name = name + "" + (getRandom(40) + 60) }
            if (randomiser == 4) { new_name = name + "_" + nicks[getRandom(10)] }
            if (randomiser == 5) { new_name = name.substr(0, 4) + "_" + nicks[getRandom(10)] + "" + (1000 + getRandom(9000)) }
        }
        return {
            name: name,
            email: new_name + "@" + domainList[getRandom(domainList.length)],
            gender: gender,
            indian: true
        };

    });
}

async function generateIndianList() {
    const namelist = await fetch("names.json").catch((err) => {
        if (window.location.href.indexOf("http") !== 0) {
            alert("URL scheme must be 'http' or 'https' for CORS request. Try running from a Node server.")            
        } else {
            alert("JSON file missing or invalid");
        }

    });
    const indian = await namelist.json();
    let indFemaleList = generateRandomEmail(window.atob(indian.fem_names).split(", "), window.atob(indian.fem_nick).split(", "), "female");
    let indMaleList = generateRandomEmail(window.atob(indian.male_names).split(", "), window.atob(indian.male_nick).split(", "), "male");
    let allnames = [...indFemaleList, ...indMaleList];
    return Promise.resolve(allnames);
}

async function fetchList() {
    let jsondata = await fetch("https://jsonplaceholder.typicode.com/comments");
    let json = await jsondata.json();
    let emaiList = json.filter(data => (/(yahoo|msn|rediffmail|gmail|aol|hotmail)\.(com|org)/).test(data.email));
    if (emaiList.length < 5) {
        emaiList = json;
    }
    emaiList = emaiList.map(data => {
        return {
            email: data.email.split("@")[0] + "@google.com",
            gender: "female",
            indian: false
        };
    });
    const statusList = ["Divorced", "Single", "Married", "Widow", "Single Mother"];
    const indianList = await generateIndianList();
    const bundleList = [...indianList, ...emaiList];
    let mixList = shuffleList(bundleList);
    peopleList = mixList.map(data => {
        let _status = statusList[getRandom(statusList.length)];
        _status = (_status == "Widow" && data.gender == "male") ? "Widower" : _status;
        _status = (_status == "Single Mother" && data.gender == "male") ? "Single Father" : _status;
        return {
            status: _status,
            email: data.email,
            gender: data.gender,
            indian: data.indian
        };

    });
    displayList(peopleList, 0);
}


document.getElementById("maritals").addEventListener("change", function(e) {
    initDisplay.filter();
});
document.getElementById("loc").addEventListener("change", function(e) {
    initDisplay.filter();
});

fetchList();