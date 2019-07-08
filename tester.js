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
    filter: function(){
         displayprocess = false;
         let loc = document.getElementById("loc").value;
         let isIndian = loc == "indian" ? true : loc == "other" ? false : loc;
         let status = this.status[document.getElementById("maritals").value];
        if (status == "" && loc == "all") {
            this.disp(peopleList);
        } else {
            let ppl = peopleList.filter(function(p) {
                if(status == "" && isIndian != "all"){return p.indian === isIndian;}
                if(status != "" && isIndian == "all"){return p.status === status;}
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
                para.innerHTML = `${ind} <span>${people[num].email}</span> <span>${people[num].status}</span>`;
                let resultElt = document.getElementById("results");
                resultElt.appendChild(para);
                para.classList.add("showup");
                para.setAttribute("data-gender", people[num].gender);
                displayList(people, numb);
            }, 300);
        }

    }

}

function generateRandomEmail(names, nicks, gender) {
    let domainList = ["hotmail.com", "yahoo.com", "msn.com", "gmail.com", "aol.com", "rediffmail.com", "ymail.com", "outlook.com"];
    return names.map(function(name) {
        let randomiser = Math.floor(Math.random() * 6);
        let new_name = "";
        if (name.length < 5) {
            if (randomiser > 3) { new_name = name + "_" + nicks[Math.floor(Math.random() * 10)] + "_" + (1000 + Math.round(Math.random() * 9000)); } else { new_name = name + "19" + (Math.round(Math.random() * 40) + 60) + nicks[Math.floor(Math.random() * 10)]; }
        } else {
            if (randomiser == 0) { new_name = name.substr(0, 4) + "19" + (Math.round(Math.random() * 40) + 60) + "_" + (1000 + Math.round(Math.random() * 9000)); }
            if (randomiser == 1) { new_name = name.substr(0, 4) + "" + (Math.round(Math.random() * 40) + 60) + "_" + (1000 + Math.round(Math.random() * 9000)); }
            if (randomiser == 2) { new_name = name + "19" + (Math.round(Math.random() * 40) + 60); }
            if (randomiser == 3) { new_name = name + "" + (Math.round(Math.random() * 40) + 60); }
            if (randomiser == 4) { new_name = name + "_" + nicks[Math.floor(Math.random() * 10)]; }
            if (randomiser == 5) { new_name = name.substr(0, 4) + "_" + nicks[Math.floor(Math.random() * 10)] + "" + (1000 + Math.round(Math.random() * 9000)); }
        }
        return {
            name: name,
            email: new_name + "@" + domainList[Math.floor(Math.random() * domainList.length)],
            gender: gender,
            indian: true
        };

    });
}

async function generateIndianList() {
    const namelist = await fetch("names.json").catch(e => console.log("............." + e));
    const indian = await namelist.json();
    let indFemaleList = generateRandomEmail(window.atob(indian.fem_names).split(", "), window.atob(indian.fem_nick).split(", "), "female");
    let indMaleList = generateRandomEmail(window.atob(indian.male_names).split(", "), window.atob(indian.male_nick).split(", "), "male");
    let allnames = [...indFemaleList, ...indMaleList];
    return new Promise((res, rej) => res(allnames));
}

async function fetchList() {
    let jsondata = await fetch("https://jsonplaceholder.typicode.com/comments");
    let json = await jsondata.json();
    let emaiList = json.filter(data => data.email.includes("yahoo.com") || data.email.includes("msn.org") || data.email.includes("rediffmail.com") || data.email.includes("gmail.com") || data.email.includes("aol.com") || data.email.includes("hotmail.com"));
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
    let the_list = _.shuffle(bundleList);
    the_list = the_list.map(data => {
        _status = statusList[Math.floor(Math.random() * statusList.length)];
        _status = (_status == "Widow" && data.gender == "male") ? "Widower" : _status;
        _status = (_status == "Single Mother" && data.gender == "male") ? "Single Father" : _status;
        return {
            status: _status,
            email: data.email,
            gender: data.gender,
            indian: data.indian
        };

    });
    peopleList = the_list;
    displayList(the_list, 0);
}


document.getElementById("maritals").addEventListener("change", function(e) {    
    initDisplay.filter();    
});
document.getElementById("loc").addEventListener("change", function(e) {
    initDisplay.filter();
});

fetchList();