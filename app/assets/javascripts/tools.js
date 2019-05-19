// On Click Fetch Functions
const fetchTools = () => {
  fetch(`/tools.json`)
    .then(response => response.json())
    .then(data => displayTools(data));
};

// Display Functions
const displayTools = (data) => {
  let indexHtml = buildToolIndex(data);
  $('#main-body').html(indexHtml);
  data.forEach(tool => {
    let newTool = new Tool(tool);
    let eachHtml = newTool.formatIndex();
    $('.list-tools').append(eachHtml);
  });
};

const showTool = (data) => {
  let newTool = new Tool(data);
  let showHtml = newTool.formatShow();
  $("#main-body").html(showHtml);
};

// Constructor Function
function Tool(tool) {
  this.id = tool.id;
  this.name = tool.name;
  this.project = tool.project;
};

// Format Index Page - Skeleton
function buildToolIndex(data) {
  let indexHtml = `
    <div class="inside">
    <h1>Tools</h1>
  `
  if (!!data.length) {
    indexHtml = indexHtml + '<div class="list-tools"></div>'
  };
  return (indexHtml + '</div>')
};

// Format Index Page
Tool.prototype.formatIndex = function() {
  let toolHtml = `
    <div class="each-tool">
      <a href="/tools/${this.id}/edit">${this.name}</a> ${listProject(this)}
    </div>
  `
  return toolHtml;
};

// Format Show Page
Tool.prototype.formatShow = function() {
  let toolHtml = `
    <div class="inside">
      <a href="/tools/${this.id}/edit"><h1>${this.name}</h1></a>
      <h2>Current Project: <a href="/projects/${this.project.id}">${this.project.name}</a></h2>
    </div>
  `
  return toolHtml;
};
