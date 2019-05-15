const displayProjects = (data) => {
  let indexHtml = `
    <div class="inside">
    <h1>Projects</h1>
    <div class="constant"><h2></h2></div>
    <div class="inProgress"><h2>In Progress:</h2></div>
    <div class="upcoming"><h2>Upcoming:</h2></div>
    <div class="finished"><h2>Finished:</h2></div>
    </div>
  `
  $('#main-body').html(indexHtml)
  console.log(data)
  data.forEach(project => {
    let newProject = new Project(project)
    let status = findStatus(newProject)
    let eachHtml = newProject.formatIndex(status)
    console.log(`${newProject.name} - ${status}`)
    $(`.${findStatus(newProject)}`).append(eachHtml)
  });
};

function Project(project) {
  this.id = project.id;
  this.name = project.name;
  this.status = project.status;
  this.pattern_info = project.pattern_info;
  this.tools = project.tools;
  this.yarns = project.yarns;
  this.notes = project.notes;
};

Project.prototype.formatIndex = function(status) {
  let projectHtml
  if (status === "constant") {
    projectHtml = `
      <div class="each-project">
        <h2><a href="/projects/${this.id}">${this.name}</a></h2>
      </div>
    `
  } else {
    projectHtml = `
      <div class="each-project">
        <a href="/projects/${this.id}">${this.name}</a>
      </div>
    `
  }
  return projectHtml;
};

function findStatus(project) {
  let status;
  switch (project.status) {
    case "CONSTANT":
      status = "constant";
      break;
    case "In Progress":
      status = "inProgress";
      break;
    case "Upcoming":
      status = "upcoming";
      break;
    case "Finished":
      status = "finished";
      break;
  };
  return status;
};
