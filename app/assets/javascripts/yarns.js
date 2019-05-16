const fetchYarns = () => {
  fetch(`/yarns.json`)
    .then(response => response.json())
    .then(data => displayYarns(data));
};

const showYarn = (data) => {
  let newYarn = new Yarn(data)
  let showHtml = newYarn.formatShow()
  $("#main-body").html(showHtml)
};

const displayYarns = (data) => {
  $('#main-body').html('<div class="inside"><h1>Yarn</h1><div class="list-yarns"></div></div>')
  // let indexHtml = buildYarnIndex(data)
  // $('#main-body').html(indexHtml)
  data.forEach(yarn => {
    let newYarn = new Yarn(yarn)
    let eachHtml = newYarn.formatIndex()
    $('.list-yarns').append(eachHtml)
    // $(`.${newYarn.divStatus}`).append(eachHtml)
  });
};

// function buildYarnIndex(data) {
//   const statusArray = []
//   let indexHtml = `
//     <div class="inside">
//     <h1>Yarn</h1>
//   `
//   data.forEach(yarn => {
//     statusArray.push(yarn.status);
//   });
//   let unique = [...new Set(statusArray)];
//
//   if (unique.includes("CONSTANT")) {
//     indexHtml = indexHtml + '<div class="list-yarn constant"></div>'
//   };
//   if (unique.includes("In Progress")) {
//     indexHtml = indexHtml + '<div class="list-yarn inProgress"><h2>In Progress:</h2></div>'
//   };
//   if (unique.includes("Upcoming")) {
//     indexHtml = indexHtml + '<div class="list-yarn upcoming"><h2>Upcoming:</h2></div>'
//   };
//   if (unique.includes("Finished")) {
//     indexHtml = indexHtml + '<div class="list-yarn finished"><h2>Finished:</h2></div>'
//   };
//   indexHtml = indexHtml + '</div>'
//
//   return indexHtml
// };

function Yarn(yarn) {
  this.id = yarn.id;
  this.color = yarn.color;
  this.count = yarn.count;
  this.scrap = yarn.scrap;
  this.brand = yarn.brand;
  this.project = yarn.project;
  // this.divStatus = this.findDivStatus();
};

// Yarn.prototype.findDivStatus = function() {
//   switch (this.status) {
//     case "CONSTANT":
//       return "constant";
//     case "In Progress":
//       return "inProgress";
//     case "Upcoming":
//       return "upcoming";
//     case "Finished":
//       return "finished";
//   };
// };

Yarn.prototype.formatIndex = function() {
  let yarnHtml;
  yarnHtml = `
    <div class="each-yarn">
      <a href="/yarns/${this.id}/edit">${this.brand.name} - ${this.color}</a> ${listProject(this)}
    </div>
  `
  return yarnHtml;
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

Yarn.prototype.formatShow = function() {
  let yarnHtml = `
    <div class="inside">
      <h1><a href="/brands/${this.brand.id}">${this.brand.name}</a> - <a href="/yarns/${this.id}/edit">${this.color}</a></h1>
      <h2>Current Project: <a href="/projects/${this.project.id}">${this.project.name}</a></h2>
      ${formatYarnAmountNew(this)}
    </div>
  `
  return yarnHtml
};
