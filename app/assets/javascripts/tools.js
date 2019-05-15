const displayTools = (data) => {
  $('#main-body').html('<h1>Tools</h1>')
  data.forEach(tool => {
    let newTool = new Tool(tool)
    let eachHtml = newTool.formatIndex()
    $('#main-body').append(eachHtml)
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
