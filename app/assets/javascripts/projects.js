const displayProjects = (data) => {
  let indexHtml = buildProjectIndex(data)
  $('#main-body').html(indexHtml)
  data.forEach(project => {
    let newProject = new Project(project)
    let eachHtml = newProject.formatIndex()
    $(`.${newProject.divStatus}`).append(eachHtml)
  });
};

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
    indexHtml = indexHtml + '<div class="list-project constant"></div>'
  };
  if (unique.includes("In Progress")) {
    indexHtml = indexHtml + '<div class="list-project inProgress"><h2>In Progress:</h2></div>'
  };
  if (unique.includes("Upcoming")) {
    indexHtml = indexHtml + '<div class="list-project upcoming"><h2>Upcoming:</h2></div>'
  };
  if (unique.includes("Finished")) {
    indexHtml = indexHtml + '<div class="list-project finished"><h2>Finished:</h2></div>'
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
  this.brands = project.brands;
  this.divStatus = this.findDivStatus();
};

Project.prototype.findDivStatus = function() {
  switch (this.status) {
    case "CONSTANT":
      return "constant";
    case "In Progress":
      return "inProgress";
    case "Upcoming":
      return "upcoming";
    case "Finished":
      return "finished";
  };
};

Project.prototype.formatIndex = function() {
  let projectHtml;
  if (this.divStatus === "constant") {
    projectHtml = `
      <div class="each-project">
        <h2><a href="/projects/${this.id}" data-id="${this.id}" class="show-project">${this.name}</a></h2>
      </div>
    `
  } else {
    projectHtml = `
      <div class="each-project">
        <a href="/projects/${this.id}" data-id="${this.id}" class="show-project">${this.name}</a>
      </div>
    `
  }
  return projectHtml;
};










Project.prototype.buildShowHtml = function() {
  // let sortedYarn;
  if (this.name === "Stash") {
    let stash = true
  };

  let projectHtml = `<div class="inside"><h1>${this.name}</h1>`;
  let statusHtml = `
    <p>Status: ${this.status}</p>
    <p>Pattern: ${this.pattern_info}</p>
  `
  let notesHtml = `
    </div>
  `
  let yarnHtml = ""
  let toolHtml = `
    BUTTONS!!!!!
    </div>
  `

  if (stash === true) {
    statusHtml = ""
  };
  if (this.notes.length > 0) {
    notesHtml = `
      </div><div class="notes">
          <h2>Notes:</h2>
      </div>
    `
  };
  if (this.yarns.length > 0) {
    // sortedYarn = yarns.sort((a, b) => (a.brand_name > b.brand_name) ? 1 : (a.brand_name === b.brand_name) ? ((a.color > b.color) ? 1 : -1) : -1)
    if (stash === true) {
      yarnHtml = `
      <div class="project-yarns">
        <h2>Stashed Yarn:</h2>
        <ul class="project-yarn-list"></ul>
      </div>
      `
    } else {
      yarnHtml = `
      <div class="project-yarns">
        <h2>Stashed Yarn:</h2>
        <ul class="project-yarn-list"></ul>
      </div>
      `
    };
  };
  if (this.tools.length > 0) {
    if (stash === true) {
      toolHtml = `
      <div class="project-tools">
        <h2><a href="/projects/${this.id}/tools">Stashed Tools:</a></h2>
        <ul class="project-tools-list"></ul>
        <a href="/projects/${this.id}/tools/new">Add a tool to this project</a>
      </div>
      `
    } else {
      toolHtml = `
      <div class="project-tools">
        <h2><a href="/projects/${this.id}/tools">Project Tools:</a></h2>
        <ul class="project-tools-list"></ul>
        <a href="/projects/${this.id}/tools/new">Add a tool to this project</a>
      </div>
      `
    };
  };




  console.log(this.notes)
  console.log(this.notes.length)
  projectHtml = projectHtml + statusHtml + notesHtml + yarnHtml + toolHtml


  // let indexHtml = `
  //   <div class="inside">
  //   <h1>Projects</h1>
  // `
  // data.forEach(project => {
  //   statusArray.push(project.status);
  // });
  // let unique = [...new Set(statusArray)];
  //
  // if (unique.includes("CONSTANT")) {
  //   indexHtml = indexHtml + '<div class="list-project constant"></div>'
  // };
  // if (unique.includes("In Progress")) {
  //   indexHtml = indexHtml + '<div class="list-project inProgress"><h2>In Progress:</h2></div>'
  // };
  // if (unique.includes("Upcoming")) {
  //   indexHtml = indexHtml + '<div class="list-project upcoming"><h2>Upcoming:</h2></div>'
  // };
  // if (unique.includes("Finished")) {
  //   indexHtml = indexHtml + '<div class="list-project finished"><h2>Finished:</h2></div>'
  // };
  // indexHtml = indexHtml + '</div>'
  //
  // return indexHtml
};

Project.prototype.formatShow = function() {
  let projectHtml = this.buildShowHtml;
  // let projectHtml;
  // if (this.divStatus === "constant") {
  //   projectHtml = `
  //     <div class="each-project">
  //       <h2><a href="/projects/${this.id}" data-id="${this.id}" class="show-project">${this.name}</a></h2>
  //     </div>
  //   `
  // } else {
  //   projectHtml = `
  //     <div class="each-project">
  //       <a href="/projects/${this.id}" data-id="${this.id}" class="show-project">${this.name}</a>
  //     </div>
  //   `
  // }
  return projectHtml;
};

const showProject = (data) => {
  console.log("SHOWING")
  let newProject = new Project(data)
  let indexHtml = newProject.buildShowHtml()
  // indexHtml = newProject.formatShow()
  $('#main-body').html(indexHtml)
};
