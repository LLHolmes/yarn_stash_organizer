$(document).on('turbolinks:load', () => {
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".js-tools").on("click", (event) => {
    event.preventDefault();
    history.pushState(null, null, "tools")
    fetchTools()
  });
  // $(".js-yarns").on("click", (event) => {
  //   event.preventDefault();
  //   history.pushState(null, null, "yarns")
  //   fetchYarns()
  // });
  $(".js-projects").on("click", (event) => {
    event.preventDefault();
    history.pushState(null, null, "projects")
    fetchProjects()
  });

  $(document).on("click", ".show-project", function(event) {
    event.preventDefault();
    let id = $(this).attr('data-id')
    history.pushState(null, null, `/projects/${id}`)
    fetchProjectShow(id)
  });

  $("#new_tool").submit ((event) => {
    event.preventDefault();
    const values = $("form").serialize()
    $.post("/tools", values)
      .done(data => {
        showTool(data)
      });
  });

  $("#new_yarn").submit ((event) => {
    event.preventDefault();
    const values = $("form").serialize()
    $.post("/yarns", values)
      .done(data => {
        showYarn(data)
      });
  });

  $("#new_project").submit ((event) => {
    event.preventDefault();
    const values = $("form").serialize()
    $.post("/projects", values)
      .done(data => {
        showProject(data)
      });
  });

  $(document).on("click", ".delete_project", function(event) {
    event.preventDefault();
    let id = $(this).attr('data-id')
    console.log(`DELETE PROJECT: ${id}`)
    const values = $("form").serialize()
    console.log(values)
    // history.pushState(null, null, `/projects/${id}`)
    // fetchProjectShow(id)
  });
};
