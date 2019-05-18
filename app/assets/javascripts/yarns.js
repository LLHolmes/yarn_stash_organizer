// On Click Fetch Functions
const fetchYarns = () => {
  fetch(`/yarns.json`)
    .then(response => response.json())
    .then(data => displayYarns(data));
};

// Display Functions
const displayYarns = (data) => {
  sortYarnData(data);
  createYarnBrands(data);
  let weightHtml = buildYarnWeightIndex();
  $('#main-body').html(weightHtml);
  formatYarnBrands()
  data.forEach(yarn => {
    let newYarn = new Yarn(yarn)
    let eachHtml = newYarn.formatIndex()
    $(`.${newYarn.brand.nameDiv}`).append(eachHtml)
  });
};

const showYarn = (data) => {
  let newYarn = new Yarn(data);
  let showHtml = newYarn.formatShow();
  $("#main-body").html(showHtml);
};

// Constructor Functions
function Yarn(yarn) {
  this.id = yarn.id;
  this.color = yarn.color;
  this.count = yarn.count;
  this.scrap = yarn.scrap;
  this.brand = yarn.brand;
  this.project = yarn.project;
};

let store = {brands:[], brand_ids:[], brand_weights:[]};

function Brand(yarn) {
  this.id = yarn.brand.id;
  this.name = yarn.brand.name;
  this.material = yarn.brand.material;
  this.weight = yarn.brand.weight;
  this.nameDiv = yarn.brand.nameDiv;
  this.weightDiv = yarn.brand.weightDiv;

  store.brands.push(this);
  store.brand_ids.push(this.id);
  store.brand_weights.push(this.weightDiv);
};

function createYarnBrands(data) {
  data.forEach(yarn => {
    if (!store.brand_ids.includes(yarn.brand.id)) {
      new Brand(yarn)
    };
  });
};

// YARN INDEX PAGE FUNCTIONS
// Format Index Page - Weight Skeleton
function buildYarnWeightIndex() {
  const brandWeightOptions = [
    {weightDiv: 'weight-0-lace', weight: '0 - Lace'},
    {weightDiv: 'weight-1-superfine', weight: '1 - Super Fine'},
    {weightDiv: 'weight-2-fine', weight: '2 - Fine'},
    {weightDiv: 'weight-3-light', weight: '3 - Light'},
    {weightDiv: 'weight-4-medium', weight: '4 - Medium'},
    {weightDiv: 'weight-5-bulky', weight: '5 - Bulky'},
    {weightDiv: 'weight-6-superbulky', weight: '6 - Super Bulky'},
    {weightDiv: 'weight-7-jumbo', weight: '7 - Jumbo'},
    {weightDiv: 'weight-novelty', weight: 'Novelty'}
  ];
  let listWeight;
  let indexHtml = `
    <div class="inside">
    <h1>Yarn</h1>
  `
  brandWeightOptions.forEach(option => {
    if (store.brand_weights.includes(option.weightDiv)) {
      listWeight = `
      <div class="weight ${option.weightDiv}">
        <h2>${option.weight}</h2>
      </div>
      `
      indexHtml = indexHtml + listWeight;
    };
  });
  indexHtml = indexHtml + '</div>';
  return indexHtml;
};

// Format Index Page - Brands Skeleton
function formatYarnBrands() {
  let listBrand;
  store.brands.forEach(brand => {
    listBrand = `
    <div class="each-brand">
    <h3><a href="/brands/${brand.id}" data-id="${brand.id}" class="show-brand">${brand.name}</a> (${brand.material}):</h3>
    <div class="${brand.nameDiv}"></div>
    </div>
    `
    $(`.${brand.weightDiv}`).append(listBrand);
  });
};

// Format Individual Yarns for Index Page
Yarn.prototype.formatIndex = function() {
  let yarnHtml;
  yarnHtml = `
    <div class="each-yarn">
      <a href="/yarns/${this.id}/edit">${this.color}</a> <span class="yarn-details">${formatYarnAmount(this)} ${listProject(this)}</span>
    </div>
  `
  return yarnHtml;
};

// YARN SHOW PAGE FUNCTION
// Format Show Page
Yarn.prototype.formatShow = function() {
  let yarnHtml = `
    <div class="inside">
      <h1><a href="/brands/${this.brand.id}">${this.brand.name}</a> - <a href="/yarns/${this.id}/edit">${this.color}</a></h1>
      <h2>Current Project: <a href="/projects/${this.project.id}">${this.project.name}</a></h2>
      ${formatYarnAmountNew(this)}
    </div>
  `
  return yarnHtml;
};
