const displayYarns = (data) => {
  let indexHtml = buildYarnIndex(data)
  $('#main-body').html(indexHtml)
  data.forEach(project => {
    let newYarn = new Yarn(project)
    let eachHtml = newYarn.formatIndex()
    $(`.${newYarn.divStatus}`).append(eachHtml)
  });
};

function buildYarnIndex(data) {
  const statusArray = []
  let indexHtml = `
    <div class="inside">
    <h1>Yarn</h1>
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

function Yarn(project) {
  this.id = project.id;
  this.name = project.name;
  this.status = project.status;
  this.pattern_info = project.pattern_info;
  this.tools = project.tools;
  this.yarns = project.yarns;
  this.notes = project.notes;
  this.divStatus = this.findDivStatus();
};

Yarn.prototype.findDivStatus = function() {
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

Yarn.prototype.formatIndex = function() {
  let projectHtml;
  if (this.divStatus === "constant") {
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

// <% weight_choices.each do |gauge| %>
//   <% if !current_user.brand_by_weight(gauge).empty? %>
//     <div class="">
//       <h2><%= gauge %></h2>
//       <div>
//       <% current_user.brand_by_weight(gauge).each do |brand| %>
//         <h4><%= link_to brand.name, brand_path(brand) %> (<%= brand.material %>):</h4>
//           <ul>
//             <% brand.yarns_by_color.each do |yarn| %>
//               <div>
//                 <%= link_to yarn.color, edit_yarn_path(yarn) %> <%= yarn_amount yarn %> <%= list_project yarn %>
//               </div>
//             <% end %>
//           </ul>
//       <% end %>
//       </div>
//     </div>
//   <% end %>
// <% end %>
