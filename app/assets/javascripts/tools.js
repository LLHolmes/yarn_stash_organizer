const fetchTools = () => {
  fetch(`/tools.json`)
    .then(response => response.json())
    .then(data => displayTools(data));
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
