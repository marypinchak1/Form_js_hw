// Wait for the DOM to finish loading
$(document).ready(function () {

  // Attach a click event handler to the photo and change__photo elements
  $('#photo, .change__photo').click(function () {
  
    // Show the file manager dialog and wait for a file to be selected
    const input = $('<input type="file">');
    input.on('change', function () {

      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onload = function (event) {
        $('#photo').attr('src', event.target.result);
      };
      reader.readAsDataURL(input[0].files[0]);

    });
    input.click();

    // Add a click event listener to the "Видалити" button
    $('.del__photo').on('click', function () {
      // Remove the photo by targeting the img element by its ID and calling the remove() function
      $('#photo').remove();
    });

  });

});

function getUserData() {

  // Get the form fields
  const FORM = document.querySelector("form");
  const FNAME = document.getElementById("fname");
  const LNAME = document.getElementById("lname");
  const ABOUT_ME = document.getElementById("about");
  const LOCATION_DATA = document.getElementById("location");
  const LANGUAGES_DATA = document.getElementById("languages");

  // Add an event listener to the form
  FORM.addEventListener("submit", (event) => {
    // Prevent the default behavior of the form
    event.preventDefault();
    // Get the values of the form fields
    const FIRST_NAME = FNAME.value;
    const LAST_NAME = LNAME.value;
    const ABOUT = ABOUT_ME.value;
    const LOC_DATA = LOCATION_DATA.value;
    const LANG_DATA = LANGUAGES_DATA.value;

    // Create an object with the data
    const dataUser = {
      First_Name: FIRST_NAME,
      Last_Name: LAST_NAME,
      About_me: ABOUT,
      Location: LOC_DATA,
      Languages: LANG_DATA,
    }

    // Get existing data from local storage or create an empty array
    let usersData = JSON.parse(localStorage.getItem("userData")) || [];

    // Add the new data to the existing array
    usersData.push(dataUser);

    // Save the updated array to local storage
    localStorage.setItem("userData", JSON.stringify(usersData));

    console.log(usersData);
  });
};
getUserData();
