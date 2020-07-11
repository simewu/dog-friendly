require 'fileutils'

desc "This file is intended to make raking the assets faster and easier."

task :assetrake do
  sh %{ RAILS_ENV=production bundle exec rake assets:precompile }
end