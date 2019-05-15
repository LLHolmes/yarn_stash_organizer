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
  let projectHtml = `<div class="inside"><h1>${this.name}</h1</div>`;
  console.log(this)
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
