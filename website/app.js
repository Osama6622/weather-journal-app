/* Global Variables */
const apiKey = "&appid=d52971440bb2a79f677f6592911ff6a5&units=metric";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const btn = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Add event listener to the btn
btn.addEventListener("click", performAction);

// Function To excute when btn clicked
function performAction() {
  const zipCode = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;

  // check if there zipCode
  if (!zipCode) {
    alert("Please enter zipCode!");
  } else {
    getData(zipCode)
      .then((data) => {
        const {
          main: { temp },
          name: cityName,
        } = data;
        // post data to the server
        postData("http://127.0.0.1:5000/postData", {
          temp,
          cityName,
          userFeelings,
          newDate,
        });
      })
      .then(() => {
        // Update UI
        updateUi();
        document.getElementById("entryHolder").style.opacity = "1";
      });
  }
}

// Function To get data from external API(openweathermap.com)
const getData = async (zipCode) => {
  const res = await fetch(baseUrl + zipCode + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (erorr) {
    console.log("Server Erorr", erorr);
  }
};

// Function To Post Data To The Server
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log("Erorr", err);
  }
};

//Function To Update UI
const updateUi = async () => {
  const res = await fetch("http://127.0.0.1:5000/getData");
  try {
    const finalData = await res.json();
    document.getElementById("date").innerHTML = finalData.newDate;
    document.getElementById("city").innerHTML = finalData.cityName;
    document.getElementById("temp").innerHTML =
      Math.round(finalData.temp) + "&degC";
    document.getElementById("content").innerHTML = finalData.userFeelings;
  } catch (err) {
    console.log("Erorr:", err);
  }
};
