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

  // Deleting Project after JS call
  $(document).on("click", ".delete_project", function(event) {
    event.preventDefault();
    let id = $(this).attr('data-id')
    $.ajax({
      type: 'DELETE',
      url: `/projects/${id}`,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      success: function(result) {
      };
    });
  });
};
