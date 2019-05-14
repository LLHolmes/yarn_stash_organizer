$(document).on('turbolinks:load', () => {
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".js-tools").on("click", (event) => {
    event.preventDefault();
    history.pushState(null, null, "tools")
    fetch(`/tools.json`)
      .then(response => response.json())
      .then(data => displayData(data));
  });
};

const displayData = (data) => {
  $('#main-body').html('<h1>Tools</h1>')
  data.forEach(tool => {
    let newTool = new Tool(tool)
    let postHtml = newTool.formatIndex()
    $('#main-body').append(postHtml)
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
