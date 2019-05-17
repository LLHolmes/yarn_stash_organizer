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
  sortYarnData(data)
  let weightHtml = buildYarnWeightIndex(data)
  $('#main-body').html(weightHtml)
  formatYarnBrandsAnother(data)
  // formatYarnBrands(data)
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
  // Find unique, alphabetized list of brand attributes
  data.forEach(yarn => {
    brandArray.push({id: yarn.brand.id, nameDiv: yarn.brand.nameDiv, name: yarn.brand.name, material: yarn.brand.material, weightDiv: yarn.brand.weightDiv});
  });
  let unique = Array.from(new Set(brandArray.map(item => item.id)))
    .map(id => {
      return {
        id: id,
        nameDiv: brandArray.find(item => item.id === id).nameDiv,
        name: brandArray.find(item => item.id === id).name,
        material: brandArray.find(item => item.id === id).material,
        weightDiv: brandArray.find(item => item.id === id).weightDiv
      }
    });
  unique.sort((a, b) => (a.nameDiv > b.nameDiv) ? 1 : -1)

  // Add each unique brand div to appropriate weightDiv
  unique.forEach(brand => {
    listBrand = `
    <h4><a href="/brand/${brand.id}" data-id="${brand.id}" class="show-brand">${brand.name}</a> (${brand.material}):</h4>
    <ul class="brand-by-name ${brand.nameDiv}"></ul>
    `
    $(`.${brand.weightDiv}`).append(listBrand);
  });
};
function formatYarnBrandsAnother(data) {
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
  // console.log(store)
  // // store.brands.forEach
  // console.log(store.brands)
  // console.log(store.brand_ids)
};

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
  // store.brand_ids.includes(yarn.brand.id))
  this.id = yarn.brand.id;
  this.name = yarn.brand.name;
  this.material = yarn.brand.material;
  this.weight = yarn.brand.weight;
  this.nameDiv = yarn.brand.nameDiv;
  this.weightDiv = yarn.brand.weightDiv;

  store.brands.push(this);
  store.brand_ids.push(this.id);
};

Yarn.prototype.formatIndex = function() {
  let yarnHtml;
  yarnHtml = `
    <div class="each-yarn-index">
      <a href="/yarns/${this.id}/edit">${this.color}</a> ${formatYarnAmount(this)} ${listProject(this)}
    </div>
  `
  return yarnHtml;
};

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
