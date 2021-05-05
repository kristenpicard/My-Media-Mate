// Edit a wishlist item JS
const editWishlistFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="wishlist-title"]').value;

  let URL = document.URL;
  let URL_array = URL.split("/");
  let id = URL_array[URL_array.length - 1];

  const response = await fetch(`/api/wishlists/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
};

// Edit
document
  .querySelector(".edit-wishlist-form")
  .addEventListener("submit", editWishlistFormHandler);
