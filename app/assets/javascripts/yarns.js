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
  let weightHtml = buildYarnWeightIndex(data)
  $('#main-body').html(weightHtml)
  formatYarnBrands(data)
  data.forEach(yarn => {
    let newYarn = new Yarn(yarn)
    let eachHtml = newYarn.formatIndex()
    $(`.${newYarn.brand.nameDiv}`).append(eachHtml)
  });
};

function buildYarnWeightIndex(data) {
  const brandWeightOptions = {
    'weight-0-lace': '0 - Lace',
    'weight-1-superfine': '1 - Super Fine',
    'weight-2-fine': '2 - Fine',
    'weight-3-light': '3 - Light',
    'weight-4-medium': '4 - Medium',
    'weight-5-bulky': '5 - Bulky',
    'weight-6-superbulky': '6 - Super Bulky',
    'weight-7-jumbo': '7 - Jumbo',
    'weight-novelty': 'Novelty'
  };
  const weightArray = [];
  let listWeight;
  let indexHtml = `
    <div class="inside">
    <h1>Yarn</h1>
  `
  data.forEach(yarn => {
    weightArray.push(yarn.brand.weightDiv);
  });
  let unique = [...new Set(weightArray)];

  unique.forEach(weightDiv => {
    listWeight = `
    <div class="weight ${weightDiv}">
      <h2>${brandWeightOptions[weightDiv]}</h2>
    </div>
    `
    indexHtml = indexHtml + listWeight;
  });
  indexHtml = indexHtml + '</div>';
  return indexHtml;
};

function formatYarnBrands(data) {
  const brandArray = [];
  let listBrand;
  // let indexHtml = `
  //   <div class="inside">
  //   <h1>Yarn</h1>
  // `
  data.forEach(yarn => {
    brandArray.push({nameDiv: yarn.brand.nameDiv, name: yarn.brand.name, weightDiv: yarn.brand.weightDiv});
  });
  let unique = Array.from(new Set(brandArray.map(item => item.nameDiv)))
    .map(nameDiv => {
      return {
        nameDiv: nameDiv,
        name: brandArray.find(item => item.nameDiv === nameDiv).name,
        weightDiv: brandArray.find(item => item.nameDiv === nameDiv).weightDiv
      }
    });
  unique.sort((a, b) => (a.nameDiv > b.nameDiv) ? 1 : -1)

  unique.forEach(brand => {
    listBrand = `
    <div class="brand-by-name ${brand.nameDiv}">
      <h4>${brand.name}</h4>
    </div>
    `
    $(`.${brand.weightDiv}`).append(listBrand);
  });
  // indexHtml = indexHtml + '</div>';

  // return indexHtml;
};

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
