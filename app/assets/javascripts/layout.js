$(document).on('turbolinks:load', () => {
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".nav-bar").on("click", (event) => {
    let targetClasses = Object.values(event.target.classList)

    if (targetClasses.includes("js-tools")) {
      event.preventDefault();
      history.pushState(null, null, "tools")
      fetchTools()
    } else if (targetClasses.includes("js-yarns")) {
      event.preventDefault();
      history.pushState(null, null, "yarns")
      fetchYarns()
    } else if (targetClasses.includes("js-projects")) {
      event.preventDefault();
      history.pushState(null, null, "projects")
      fetchProjects()
    }
  });

  $(document).on("click", ".show-project", function(event) {
    event.preventDefault();
    let id = $(this).attr('data-id')
    history.pushState(null, null, `/projects/${id}`)
    fetchProjectShow(id)
  });
};
