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
var users_friends_DB = firebase.database().ref('users_friends_DB');

document.getElementById("add-friend-form").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();

    var emailid = document.getElementById("emailid").value;
    var friendName = document.getElementById("friendName").value;
    var friendPhoneNumber = document.getElementById("friendPhone").value;

    // Hash the email to create a unique key
    var emailHash = hashEmail(emailid);

    // Create an object to hold the friend data
    var friendData = {
        name: friendName,
        phone: friendPhoneNumber
    };

    // Set the friend data under the hashed email key in Firebase under "friends_list" branch
    users_friends_DB.child(emailHash).child(friendName).set(friendPhoneNumber);

    // Log the friend data
    console.log("Friend Data:", friendData);

    // Optionally, you can show an alert message
    document.querySelector(".alert").style.display = "block";

    // Reset the form after submission
    document.getElementById("add-friend-form").reset();
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


function getUserDataByEmail(email) {
    // Hash the email to get the key
    var emailHash = hashEmail(email);

    // Reference the specific child in Firebase using the hashed email as the key
    var userDataRef = users_friends_DB.child(emailHash);

    // Retrieve the data for that user
    userDataRef.once('value', function(snapshot) {
        // Check if data exists
        if (snapshot.exists()) {
            // Data found, log it
            var userData = snapshot.val();
            console.log(userData);

            // Iterate through each class
            for (var key in userData) {
                if (userData.hasOwnProperty(key)) {
                    var name = key; // Assuming the key is the class name
                    var phone = userData[key]; // Get the data for the class
                    
                    // Do whatever you want with the name and phone
                    console.log("Name:", name);
                    console.log("Phone:", phone);
                }
            }
            
            // You can do further processing here, such as displaying the data on the UI
        } else {
            // Data not found
            console.log("User data not found");
            // You can handle this case as needed, such as displaying an error message
        }
    });
}


getUserDataByEmail("momedhat2005@gmail.com")