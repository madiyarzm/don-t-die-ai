const firebaseConfig = {
    apiKey: "AIzaSyAvleWRR50RbyfK0RBMN_T6iSzJnnbvCt4",
    authDomain: "idose-3ebe9.firebaseapp.com",
    databaseURL: "https://idose-3ebe9-default-rtdb.firebaseio.com",
    projectId: "idose-3ebe9",
    storageBucket: "idose-3ebe9.appspot.com",
    messagingSenderId: "573963934325",
    appId: "1:573963934325:web:10b78e1322c482f6aff63c"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var users_profiles_DB = firebase.database().ref('users_profiles_DB');

document.getElementById("updating_user_info_page").addEventListener("submit", submitForm);


function submitForm(e){
    e.preventDefault();

    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var insuranceid = document.getElementById("insuranceid").value;
    var emailid = document.getElementById("emailid").value;

    // Hash the email to create a unique key
    var emailHash = hashEmail(emailid);

    // Create an object to hold the form data
    var formData = {
        name: name,
        age: age,
        gender: gender,
        weight: weight,
        height: height,
        insuranceid: insuranceid,
        emailid: emailid
    };

    // Set the form data under the hashed email key in Firebase
    users_profiles_DB.child(emailHash).set(formData);

    // Log the form data
    console.log(formData);

    // Optionally, you can show an alert message
    document.querySelector(".alert").style.display = "block";

    // Reset the form after submission
    document.getElementById("updating_user_info_page").reset();

}

// Function to hash email using a simple hash function
function hashEmail(email) {
    var hash = 0;
    if (email.length == 0) return hash;
    for (var i = 0; i < email.length; i++) {
        var char = email.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
}


// Function to retrieve user data using email
function getUserDataByEmail(email) {
    // Hash the email to get the key
    var emailHash = hashEmail(email);

    // Reference the specific child in Firebase using the hashed email as the key
    var userDataRef = users_profiles_DB.child(emailHash);

    // Retrieve the data for that user
    userDataRef.once('value', function(snapshot) {
        // Check if data exists
        if (snapshot.exists()) {
            // Data found, log it
            var userData = snapshot.val();
            console.log(userData['name'] + " Data:", userData);
            // You can do further processing here, such as displaying the data on the UI
        } else {
            // Data not found
            console.log("User data not found");
            // You can handle this case as needed, such as displaying an error message
        }
    });
}

const saveMessages = (name, age, gender, weight, height, insuranceid, emailid) => {
    var new_user_profile = users_profiles_DB.push();
    
    new_user_profile.set({
        name: name,
        age: age,
        gender: gender,
        weight: weight,
        height: height,
        insuranceid: insuranceid,
        emailid: emailid
    })

}