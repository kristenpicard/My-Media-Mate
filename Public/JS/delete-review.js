// Delete a Review JS
const delRevFormHandler = async (event) => {
  event.preventDefault();

  let URL = document.URL;
  let URL_array = URL.split("/");
  let id = URL_array[URL_array.length - 1];

  const comments = await fetch(`/api/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(comments);

  // const response = await fetch(`/api/comments`, {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // if (response.ok) {
  //   document.location.replace("/dashboard");
  // } else {
  //   alert(response.statusText);
  // }
  // This console log doesn't return the data structure but when I type it (http://localhost:3001/api/comments) into the url I see the comments array!!!!
  //  console.log(comments);

  // Below I was trying to create logic for after we grabbed all comments to try and delete when the review_id matches

  // comments.forEach((comment) => {
  //   if (comment["comments"][0]["review_id"] == id) {
  //     const response = fetch(`/api/comments/${comment["comments"][0]["id"]}`, {
  //       method: "DELETE",
  //       body: JSON.stringify({
  //         review_id: id,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       document.location.replace("/dashboard");
  //     } else {
  //       alert(response.statusText);
  //     }
  //   }
  // });
  console.log(comments);
  console.log(id);
  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      review_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

// Delete
document
  .querySelector(".delete-review-btn")
  .addEventListener("click", delRevFormHandler);
