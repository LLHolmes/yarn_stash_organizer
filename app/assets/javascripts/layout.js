$(document).on('turbolinks:load', () => {
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".nav-bar").on("click", (event) => {
    let targetClasses = Object.values(event.target.classList)

    if (targetClasses.includes("js-tools")) {
      event.preventDefault();
      history.pushState(null, null, "tools")
      fetch(`/tools.json`)
        .then(response => response.json())
        .then(data => displayTools(data));
    } else if (targetClasses.includes("js-yarns")) {
      event.preventDefault();
      history.pushState(null, null, "tools")
      fetch(`/yarns.json`)
        .then(response => response.json())
        .then(data => displayYarns(data));
    } else if (targetClasses.includes("js-projects")) {
      event.preventDefault();
      history.pushState(null, null, "projects")
      fetch(`/projects.json`)
        .then(response => response.json())
        .then(data => displayProjects(data));
    }
  });

  $(document).on("click", ".show-project", function(event) {
    event.preventDefault();
    let id = $(this).attr('data-id')
    fetch(`/projects/${id}.json`)
      .then(response => response.json())
      .then(data => showProject(data));
  });
};
