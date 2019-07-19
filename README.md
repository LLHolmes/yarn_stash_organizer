# Yarn Stash Organizer

FlatIron School - Rails with JavaScript Portfolio Project

Welcome to Yarn Stash Organizer, an application designed to help you wrangle your yarn stash and crafty projects.

## Usage
This project is currently hosted at https://yarn-stash-organizer.herokuapp.com.

To run on your local host, fork and clone this repo, then:

Run:
```
$ bundle install
```

Migrate database:
```
$ rake db:create && rake db:migrate
```

To run on your local machine:
```
$ rails s
```

If you would like to user OmniAuth to log-in through FaceBook:
```
$ thin start --ssl
```

Copy the given host (for example "http://localhost:3000/" or "https://0.0.0.0:3000/") into the URL of your favorite web browser.


Add yarn to your virtual stash to track what yarn you have available for your crafting projects.  Upon joining, you will automatically be given a "Stash" project and be taken to your home page which will display a list of your current Projects, Yarn, and Tools.  Your "Stash" will be your default project where all yarns and tools will be added unless you specify a project.

At the top of all pages you will find quick access to your Home, Projects, Yarn, and Tools indexes, along with links to add a New Project, New Tool, New Yarn, or New Yarns (where you can add multiple yarns at once).  You can visit Account Details if you want to change your password or delete your account. Sign Out will end your session.

Selecting and individual Yarn or Tool from any index will take you to an edit page to update it. You can visit individual Project to see more details and can choose to update it or delete it.  You can add notes on the update page. If you delete a Project, all associated yarn and tools will be added to your "Stash".  If you finish a project, you will be taken to a secondary page where you should update the amount of yarn you have remaining after completing your project, ensuring your stash remains up to date.  When finishing a project, all yarn and tools will be added back into your "Stash".

Have fun!

## Development

After checking out the repo, you can run `rails c` for an interactive prompt that will allow you to experiment.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/LLHolmes/yarn_stash_organizer. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Yarn Stash Organizer project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/<github username>/yarn_organizer/blob/master/CODE_OF_CONDUCT.md).
