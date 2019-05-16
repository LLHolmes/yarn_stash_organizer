$(document).on('turbolinks:load', () => {
  bindClickHandlers();
});

const bindClickHandlers = () => {
  $(".nav-bar").on("click", (event) => {
    event.preventDefault();
    let targetClasses = Object.values(event.target.classList)

    if (targetClasses.includes("js-tools")) {
      history.pushState(null, null, "tools")
      fetch(`/tools.json`)
        .then(response => response.json())
        .then(data => displayTools(data));
    } else if (targetClasses.includes("js-yarns")) {
      history.pushState(null, null, "tools")
      fetch(`/yarns.json`)
        .then(response => response.json())
        .then(data => displayYarns(data));
    } else if (targetClasses.includes("js-projects")) {
      history.pushState(null, null, "projects")
      fetch(`/projects.json`)
        .then(response => response.json())
        .then(data => displayProjects(data));
    }
  });

  $(document).on("click", ".show-project", function(event) {
    event.preventDefault();
    let id = $(this).attr('data-id')
    fetch(`/projects/${id}.json`)
      .then(response => response.json())
      .then(data => showProject(data));
  });
};

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

function formatYarnAmount(yarn) {
  let amount;
  if (!!yarn.count && yarn.count === 1) {
    if (!!yarn.scrap && yarn.scrap > 0) {
      amount = `(${yarn.count} skein, ${yarn.scrap} oz. scrap)`
    } else {
      amount = `(${yarn.count} skein)`
    };
  } else if (!!yarn.count && yarn.count > 1) {
    if (!!yarn.scrap && yarn.scrap > 0) {
      amount = `(${yarn.count} skeins, ${yarn.scrap} oz. scrap)`
    } else {
      amount = `(${yarn.count} skeins)`
    };
  } else if (!!yarn.scrap) {
    amount = `(${yarn.scrap} oz. scrap)`
    };
  };
  return amount;
};

function formatBrandYarnLinks(yarn) {
  return (`<a href="/brands/${yarn.brand_id}">${yarn.brand_name}</a> - <a href="/yarns/${yarn.id/edit}">${yarn.color}</a>`)
};
