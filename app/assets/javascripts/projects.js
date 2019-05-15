const displayProjects = (data) => {
  let indexHtml = buildHtml(data)
  $('#main-body').html(indexHtml)
  data.forEach(project => {
    let newProject = new Project(project)
    let status = findStatus(newProject)
    let eachHtml = newProject.formatIndex(status)
    $(`.${status}`).append(eachHtml)
  });
};

function buildHtml(data) {
  const statusArray = []
  let indexHtml = `
    <div class="inside">
    <h1>Projects</h1>
  `
  data.forEach(project => {
    statusArray.push(project.status);
  });
  let unique = [...new Set(statusArray)];

  if (unique.includes("CONSTANT")) {
    indexHtml = indexHtml + '<div class="constant"></div>'
  };
  if (unique.includes("In Progress")) {
    indexHtml = indexHtml + '<div class="inProgress"><h2>In Progress:</h2></div>'
  };
  if (unique.includes("Upcoming")) {
    indexHtml = indexHtml + '<div class="upcoming"><h2>Upcoming:</h2></div>'
  };
  if (unique.includes("Finished")) {
    indexHtml = indexHtml + '<div class="finished"><h2>Finished:</h2></div>'
  };
  indexHtml = indexHtml + '</div>'

  return indexHtml
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
