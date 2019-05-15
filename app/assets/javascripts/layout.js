$(document).on('turbolinks:load', () => {
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".nav-bar").on("click", (event) => {
    event.preventDefault();
    console.log(event)
    let targetClasses = Object.values(event.target.classList)
    console.log(targetClasses)

    if (targetClasses.includes("js-tools")) {
      history.pushState(null, null, "tools")
      fetch(`/tools.json`)
        .then(response => response.json())
        .then(data => displayTools(data));
    } else if (targetClasses.includes("js-yarns")) {
      history.pushState(null, null, "tools")
      fetch(`/yarns.json`)
        .then(response => response.json())
        .then(data => displayYarns(data));
    } else if (targetClasses.includes("js-projects")) {
      history.pushState(null, null, "projects")
      fetch(`/projects.json`)
        .then(response => response.json())
        .then(data => displayProjects(data));
    }
  });
};

function listProject(object) {
  let listProject = ""
  if (object.project.name != "Stash") {
    listProject = `~  Current Project: <a href="/projects/${object.project.id}">${object.project.name}</a>`
  }
  return listProject
};
