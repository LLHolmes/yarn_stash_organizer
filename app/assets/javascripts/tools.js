const fetchTools = () => {
  fetch(`/tools.json`)
    .then(response => response.json())
    .then(data => displayTools(data));
};

const showTool = (data) => {
  let newTool = new Tool(data)
  let showHtml = newTool.formatShow()
  $("#main-body").html(showHtml)
};

const displayTools = (data) => {
  $('#main-body').html('<div class="inside"><h1>Tools</h1><div class="list-tools"></div></div>')
  data.forEach(tool => {
    let newTool = new Tool(tool)
    let eachHtml = newTool.formatIndex()
    $('.list-tools').append(eachHtml)
  });
};

function Tool(tool) {
  this.id = tool.id;
  this.name = tool.name;
  this.project = tool.project;
};

Tool.prototype.formatIndex = function() {
  let toolHtml = `
    <div class="each-tool">
      <a href="/tools/${this.id}/edit">${this.name}</a> ${listProject(this)}
    </div>
  `
  return toolHtml
};

Tool.prototype.formatShow = function() {
  let toolHtml = `
    <div class="inside">
      <a href="/tools/${this.id}/edit"><h1>${this.name}</h1></a>
      <h2>Current Project: <a href="/projects/${this.project.id}">${this.project.name}</a></h2>
    </div>
  `
  return toolHtml
};
