$(document).ready(function () {
  // Wait for the DOM to finish loading

  // Show the file manager dialog and wait for a file to be selected
  const input = $("<input type='file'>");
  input.on("change", function () {
    // Read the selected file as a data URL
    const reader = new FileReader();
    reader.onload = event => {
      $("#photo").attr("src", event.target.result);
    };
    reader.readAsDataURL(input[0].files[0]);
  });

  // Attach a click event handler to the photo and change__photo elements
  $(".photo__container").click(() => {
    input.click();
  });
  $(".change__photo").click(() => {
    input.click();
  });

  // Add a click event listener to the "Видалити" button using event delegation
  $(document).on("click", ".del__photo", () => {
    // Remove the photo from local storage
    localStorage.removeItem("photo");

    // Remove the photo from the page
    $("#photo").attr("src", "./img/img-Girl.svg");
  });
});


// click on the button with class "save__btn"
$(".save__btn").click(() => {

  // check all required fields
  if (
    $("#fname").val() === "" ||
    $("#lname").val() === "" ||
    $("#about").val() === "" ||
    $("#location").val() === "" ||
    $("#languages").val() === ""
  ) {
    // Show the error message
    alert("Заповніть всі поля");
    return;
  }    

  // Get user data from form
  const getUserData = () => {
    const userData = {
      id: new Date().getTime(), // add a unique id to each dataUser object
      photo: $("#photo").attr("src"),
      name: $("#fname").val(),
      surname: $("#lname").val(),
      about: $("#about").val(),
      location: $("#location").val(),
      languages: $("#languages").val(),
    };
    return userData;
  };

  // Get existing user data from local storage, or create an empty array if it doesn't exist
  const existingUserData = JSON.parse(localStorage.getItem("userData")) || [];

  // Get user data from form
  const userData = getUserData();

  // Add the new user data to the existing array of user data
  existingUserData.push(userData);

  // Save the updated array of user data to local storage
  localStorage.setItem("userData", JSON.stringify(existingUserData));

  // clear the form
  $("#fname").val("");
  $("#lname").val("");
  $("#about").val("");
  $("#location").val("");
  $("#languages").val("");

  // Show the success message
  alert("Дані успішно збережено");
  



  // show data from local storage on page
  const showUserData = JSON.parse(localStorage.getItem("userData"));
  const lastUserData = showUserData[showUserData.length - 1];
  $("#photo").attr("src", lastUserData.photo);
  $("#fname").val(lastUserData.name);
  $("#lname").val(lastUserData.surname);
  $("#about").val(lastUserData.about);
  $("#location").val(lastUserData.location);
  $("#languages").val(lastUserData.languages);
  // Call the function to show user data
  // (assuming that this function is defined elsewhere)
  showUserData();
});
