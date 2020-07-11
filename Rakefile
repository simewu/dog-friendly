# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'
DIST_FILES = FileList["**/*.rb", "**/*.rdoc"]
DIST_FILES.exclude("app/channels/application_cable/connection.rb", "app/channels/application_cable/channel.rb")

Rails.application.load_tasks
