$(document).on('turbolinks:load', () => {
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".js-tools").on("click", (event) => {
    event.preventDefault();
    fetch(`/tools.json`)
      .then(response => response.json())
      .then(data => displayData(data));
  });
};

const displayData = (data) => {

  });
};
