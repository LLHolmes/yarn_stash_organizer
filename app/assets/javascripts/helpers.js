function listProject(object) {
  let listProject = ""
  if (object.project.name != "Stash") {
    listProject = `~  Current Project: <a href="/projects/${object.project.id}">${object.project.name}</a>`
  }
  return listProject
};

function sortBrandYarns(yarns) {
  let sortedYarn = yarns.sort((a, b) => (a.brand_name > b.brand_name) ? 1 : (a.brand_name === b.brand_name) ? ((a.color > b.color) ? 1 : -1) : -1)
  return sortedYarn
};

function sortYarnData(data) {
  data.sort((a, b) => (a.color > b.color) ? 1 : -1)
};

function formatYarnAmount(yarn) {
  if (!!yarn.count && yarn.count === 1) {
    if (!!yarn.scrap && yarn.scrap > 0) {
      return `(${yarn.count} skein, ${yarn.scrap} oz. scrap)`
    } else {
      return `(${yarn.count} skein)`
    };
  } else if (!!yarn.count && yarn.count > 1) {
    if (!!yarn.scrap && yarn.scrap > 0) {
      return `(${yarn.count} skeins, ${yarn.scrap} oz. scrap)`
    } else {
      return `(${yarn.count} skeins)`
    };
  } else if (!!yarn.scrap) {
    return `(${yarn.scrap} oz. scrap)`
  };
};

function formatYarnAmountNew(yarn) {
  if (!!yarn.count) {
    if (!!yarn.scrap) {
      return `
        <p>Full skeins: ${yarn.count}</p>
        <p>Scrap (oz.): ${yarn.scrap}</p>
      `
    } else {
      return `
        <p>Full skeins: ${yarn.count}</p>
      `
    };
  } else if (!!yarn.scrap) {
    return `
      <p>Scrap (oz.): ${yarn.scrap}</p>
    `
  };
};

function formatBrandYarnLinks(yarn) {
  return (`<a href="/brands/${yarn.brand_id}">${yarn.brand_name}</a> - <a href="/yarns/${yarn.id}/edit">${yarn.color}</a>`)
};
