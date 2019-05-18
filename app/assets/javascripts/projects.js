// On Click Fetch Functions
const fetchProjects = () => {
  fetch(`/projects.json`)
    .then(response => response.json())
    .then(data => displayProjects(data));
};

const fetchProjectShow = (id) => {
  fetch(`/projects/${id}.json`)
    .then(response => response.json())
    .then(data => showProject(data));
};

// Display Functions
const displayProjects = (data) => {
  let indexHtml = buildProjectIndex(data);
  $('#main-body').html(indexHtml);
  data.forEach(project => {
    let newProject = new Project(project);
    let eachHtml = newProject.formatIndex();
    $(`.status-${newProject.statusDiv}`).append(eachHtml);
  });
};

const showProject = (data) => {
  let newProject = new Project(data);
  let showHtml = newProject.formatShow();
  $('#main-body').html(showHtml);
};

// Constructor Function
function Project(project) {
  this.id = project.id;
  this.name = project.name;
  this.status = project.status;
  this.pattern_info = project.pattern_info;
  this.statusDiv = project.statusDiv;
  this.tools = project.tools;
  this.yarns = project.yarns;
  this.notes = project.notes;
};

// PROJECT INDEX PAGE FUNCTIONS:
// Format Index Page - Skeleton
function buildProjectIndex(data) {
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
    indexHtml = indexHtml + '<div class="list-project status-constant"></div>'
  };
  if (unique.includes("In Progress")) {
    indexHtml = indexHtml + '<div class="list-project status-in-progress"><h2>In Progress:</h2></div>'
  };
  if (unique.includes("Upcoming")) {
    indexHtml = indexHtml + '<div class="list-project status-upcoming"><h2>Upcoming:</h2></div>'
  };
  if (unique.includes("Finished")) {
    indexHtml = indexHtml + '<div class="list-project status-finished"><h2>Finished:</h2></div>'
  };
  return (indexHtml + '</div>')
};

// Format Individual Project for Index Page
Project.prototype.formatIndex = function() {
  if (this.statusDiv === "constant") {
    return (`
      <div class="each-project">
        <h2><a href="/projects/${this.id}" data-id="${this.id}" class="show-project">${this.name}</a></h2>
      </div>
    `)
  } else {
    return (`
      <div class="each-project">
        <a href="/projects/${this.id}" data-id="${this.id}" class="show-project">${this.name}</a>
      </div>
    `)
  };
};

// PROJECT SHOW PAGE FUNCTIONS:
// Format Project Show Page - All
Project.prototype.formatShow = function() {
  let projectHtml = `<h1>${this.name}</h1>`;
  let statusHtml = this.formatShowStatus();
  let notesHtml = this.formatShowNotes();
  let yarnHtml = this.formatShowYarns();
  let toolHtml = this.formatShowTools();
  let buttonHtml = this.formatShowButton();

  return ('<div class="inside">' + projectHtml + statusHtml + notesHtml + yarnHtml + toolHtml + buttonHtml + "</div>");
};

// Format Project Show Page - Pieces
Project.prototype.formatShowStatus = function() {
  if (this.name === "Stash") {
    return "";
  } else {
    return (`
      <div class="project-details">
        <p><b>Status:</b>  ${this.status}</p>
        <p><b>Pattern:</b>  ${this.pattern_info}</p>
      </div>
    `);
  };
};

Project.prototype.formatShowNotes = function() {
  let notesHtml = "";
  let singleNote;
  if (this.notes.length > 0) {
    notesHtml = `
      <div class="project-notes">
        <h2>Notes:</h2>
        <div>
    `
    this.notes.forEach(note => {
      singleNote = `
        <div class="each-note">
          <p><em>${note.created}</em></p>
          <p>${note.note}</p>
        </div>
      `
      notesHtml = notesHtml + singleNote;
    });
    notesHtml = notesHtml + "</div></div>";
  };
  return notesHtml;
};

Project.prototype.formatShowYarns = function() {
  let yarnsHtml = "";
  let singleYarn;
  let sortedYarn = sortBrandYarns(this.yarns);
  if (!!this.yarns.length) {
    if (this.name === "Stash") {
      yarnsHtml = `
      <div class="project-yarns">
        <h2>Stashed Yarn:</h2>
        <ul class="project-yarn-list">
      `
    } else {
      yarnsHtml = `
      <div class="project-yarns">
        <h2>Project Yarn:</h2>
        <ul class="project-yarn-list">
      `
    };
    sortedYarn.forEach(yarn => {
      singleYarn = `<li class="each-project-yarn">${formatBrandYarnLinks(yarn)} <span class="yarn-details">${formatYarnAmount(yarn)}</span></li>`
      yarnsHtml = yarnsHtml + singleYarn;
    });
    yarnsHtml = yarnsHtml + "</ul></div>";
  };
  return yarnsHtml;
};

Project.prototype.formatShowTools = function() {
  let toolsHtml = ""
  let singleTool;
  if (!!this.tools.length) {
    if (this.name === "Stash") {
      toolsHtml = `
      <div class="project-tools">
        <a href="/projects/${this.id}/tools"><h2>Stashed Tools:</h2></a>
        <ul class="project-tool-list">
      `
    } else {
      toolsHtml = `
      <div class="project-tools">
        <a href="/projects/${this.id}/tools"><h2>Project Tools:</h2></a>
        <ul class="project-tool-list">
      `
    };
    this.tools.forEach(tool => {
      singleTool = `<li class="each-project-tool"><a href="/tools/${tool.id}/edit">${tool.name}</a></li>`
      toolsHtml = toolsHtml + singleTool
    });
    toolsHtml = toolsHtml + `</ul><a href="/projects/${this.id}/tools/new">Add a tool to this project</a></div>`
  };
  return toolsHtml;
};

Project.prototype.formatShowButton = function() {
  let statusHtml = `
    <form class="button_to" method="get" action="/projects/${this.id}/edit">
      <input type="submit" value="Edit Project">
    </form>
    <button class="delete_project" data-id="${this.id}">Delete Project</button>
  `
  if (this.name === "Stash") {
    statusHtml = `
      <form class="button_to" method="get" action="/projects/${this.id}/edit">
        <input type="submit" value="Edit Project">
      </form>
    `
  };
  return statusHtml;
};
