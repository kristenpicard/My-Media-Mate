$(".button").on("click", function (event) {
    event.preventDefault();
    let title = $("").val().trim();
    console.log(title);
});