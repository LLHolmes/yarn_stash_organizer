Rails Portfolio Project Requirements:

Specs:
[X] - Uses Ruby on Rails for the project
    (Project created and developed using Ruby on Rails.)
[X] - Include at least one has_many relationship
    (A user has many projects.)
[X] - Include at least one belongs_to relationship
    (Notes belong to a project.)
[X] - Include at least two has_many through relationships
    (A user has many tools through projects.)
[X] - Include at least one many-to-many relationship
    (A project has many brands and a brand has many projects through yarn.)
[X] - The join table includes at least one user submittable attribute
    (Yarn connect projects and brands and need a color and amount.)
[X] - Include reasonable validations for simple model objects
    (Brand & Tool require a name, Project requires a name & status, Yarn requires a color, User requires a unique email)
[ ] - Include at least one class level ActiveRecord scope method. a. Your scope method must be chainable, meaning that you must use ActiveRecord Query methods within it (such as .where and .order) rather than native ruby methods (such as #find_all or #sort).
[ ] - Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes)
[X] - Include signup with standard user authentication
    (Used Devise)
[X] - Include login with standard user authentication
    (Used Devise)
[X] - Include logout with standard user authentication
    (Used Devise)
[X] - Include third party signup/login
    (Used Devise/OmniAuth to signup through FaceBook or Google)
[ ] - Include nested resource show or index (URL e.g. users/2/recipes) (brands/2/yarns - projects/2/yarns -- users/2/projects [if public???])
[ ] - Include nested resource "new" form (URL e.g. recipes/1/ingredients/new) (brands/1/yarns/new - projects/1/yarns/new?)
[X] - Include form display of validation errors
    (Errors displayed on new/edit actions)
    --> [ ] - Your fields should be enclosed within a fields_with_errors class
    --> [X] - Error messages describing the validation failures must be present within the view

Confirm:
[ ] - The application is pretty DRY
[ ] - Limited logic in controllers
[ ] - Views use helper methods if appropriate
[ ] - Views use partials if appropriate

Stretch Goals:
[ ] - add a trading post (available & looking for)
    --> [ ] - messaging
    --> [ ] - link to pictures
[ ] - CSS
[ ] - sluggify?
[ ] - link to patterns / images etc.
[ ] - write a pattern???[ ] - add color_family to yarns?
[ ] - public vs. private???
    --> [ ] - nest project routes/resources
    --> [ ] - add this project to my project list
    --> [ ] - create index of all projects for inspiration?
