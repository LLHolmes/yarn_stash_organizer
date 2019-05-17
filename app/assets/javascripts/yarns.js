// On Click Fetch Functions
const fetchYarns = () => {
  fetch(`/yarns.json`)
    .then(response => response.json())
    .then(data => displayYarns(data));
};

// Display Functions
const displayYarns = (data) => {
  sortYarnData(data)
  let weightHtml = buildYarnWeightIndex(data)
  $('#main-body').html(weightHtml)
  formatYarnBrands(data)
  data.forEach(yarn => {
    let newYarn = new Yarn(yarn)
    let eachHtml = newYarn.formatIndex()
    $(`.${newYarn.brand.nameDiv}`).append(eachHtml)
  });
};

const showYarn = (data) => {
  let newYarn = new Yarn(data)
  let showHtml = newYarn.formatShow()
  $("#main-body").html(showHtml)
};

// Create Objects
function Yarn(yarn) {
  this.id = yarn.id;
  this.color = yarn.color;
  this.count = yarn.count;
  this.scrap = yarn.scrap;
  this.brand = yarn.brand;
  this.project = yarn.project;
};

let store = {brands:[], brand_ids:[]};

function Brand(yarn) {
  this.id = yarn.brand.id;
  this.name = yarn.brand.name;
  this.material = yarn.brand.material;
  this.weight = yarn.brand.weight;
  this.nameDiv = yarn.brand.nameDiv;
  this.weightDiv = yarn.brand.weightDiv;

  store.brands.push(this);
  store.brand_ids.push(this.id);
};

// YARN INDEX PAGE FUNCTIONS:
// Format Index Page - Weight Skeleton
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

// Format Index Page - Brands Skeleton
function formatYarnBrands(data) {
  let listBrand;
  data.forEach(yarn => {
    if (!store.brand_ids.includes(yarn.brand.id)) {
      new Brand(yarn)
    };
  });
  store.brands.forEach(brand => {
    listBrand = `
    <h4><a href="/brand/${brand.id}" data-id="${brand.id}" class="show-brand">${brand.name}</a> (${brand.material}):</h4>
    <ul class="brand-by-name ${brand.nameDiv}"></ul>
    `
    $(`.${brand.weightDiv}`).append(listBrand);
  });
};

// Format Individual Yarns for Index Page
Yarn.prototype.formatIndex = function() {
  let yarnHtml;
  yarnHtml = `
    <div class="each-yarn-index">
      <a href="/yarns/${this.id}/edit">${this.color}</a> ${formatYarnAmount(this)} ${listProject(this)}
    </div>
  `
  return yarnHtml;
};

// YARN SHOW PAGE FUNCTION:
// Format Show Page
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
