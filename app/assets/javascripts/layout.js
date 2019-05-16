$(document).on('turbolinks:load', () => {
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".js-tools").on("click", (event) => {
    event.preventDefault();
    history.pushState(null, null, "tools")
    fetchTools()
  });
  $(".js-yarns").on("click", (event) => {
    event.preventDefault();
    history.pushState(null, null, "yarns")
    fetchYarns()
  });
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
        $("#main-body").html("")
        $("#main-body").html("<h1>NEW TOOL CONTENT GOES HERE!</h1>")
      });
  });

  // $("#new_tool").on("submit", (event) => {
  //   event.preventDefault();
  //   console.log("SUBMITTED TOOL")
  //   console.log(this)
  //   console.log($(this))
  //   console.log($(this).serialize())
  // });
};
