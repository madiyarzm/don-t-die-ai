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

// Reference your databases
var usersProfilesDB = firebase.database().ref('users_profiles_DB');
var usersFriendsDB = firebase.database().ref('users_friends_DB');

document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch user data and friends data based on email
    function getUserDataAndFriendsByEmail(email) {
        var emailHash = hashEmail(email);
        var userProfileRef = usersProfilesDB.child(emailHash);
        var userFriendsRef = usersFriendsDB.child(emailHash);

        userProfileRef.once('value', function(userSnapshot) {
            if (userSnapshot.exists()) {
                var userData = userSnapshot.val();
                displayUserInfo(userData);
            } else {
                console.log("User data not found");
                // You can handle this case as needed
            }
        });

        userFriendsRef.once('value', function(friendsSnapshot) {
            if (friendsSnapshot.exists()) {
                var friendsData = friendsSnapshot.val();
                displayUserFriendsInfo(friendsData);
            } else {
                console.log("User friends data not found");
                // You can handle this case as needed
            }
        });
    }

    // Function to display user information on the page
    function displayUserInfo(userData) {
        var userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = `
            <p class="user">Name: ${userData.name}</p>
            <p class="user">Age: ${userData.age}</p>
            <p class="user">Gender: ${userData.gender}</p>
            <p class="user">Weight: ${userData.weight}</p>
            <p class="user">Height: ${userData.height}</p>
            <p class="user">Insurance ID: ${userData.insuranceid}</p>
        `;
    }

    // Function to display user friends information on the page
    function displayUserFriendsInfo(userData) {
        var friendsListUl = document.getElementById('friends-list');
        friendsListUl.innerHTML = ''; // Clear previous content

        for (var key in userData) {
            if (userData.hasOwnProperty(key)) {
                var name = key;
                var phone = userData[key];

                // Create a list item to display friend's information
                var listItem = document.createElement('li');
                listItem.textContent = `${name}: ${phone}`;

                // Append the list item to the friends list
                friendsListUl.appendChild(listItem);
            }
        }
    }

    // Function to handle the login button click
    document.getElementById("login-btn").addEventListener("click", function() {
        var email = document.getElementById("email").value;
        getUserDataAndFriendsByEmail(email);
    });

    // Function to handle the update info button click
    document.getElementById("update-info-btn").addEventListener("click", function() {
        // Redirect to the registration form page
        window.location.href = "registration_form.html";
    });

    // Function to handle the view friend details button click
    document.getElementById("view-friend-details-btn").addEventListener("click", function() {
        // Redirect to the friend details page
        window.location.href = "friend_details.html";
    });

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
});


