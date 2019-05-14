function listProject(object) {
  let listProject = ""
  if(object.project.name != "Stash") {
    listProject = `~  Current Project: <a href="/projects/${object.project.id}">${object.project.name}</a>`
  }
  return listProject
};
