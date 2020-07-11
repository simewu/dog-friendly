require 'fileutils'
# This file is intended to make deploying to heroku easier.

namespace :deploy do
    
    task :deployHeroku, [:message] =>
    [:pretask, :assetmigration, :commit, :heroku_push] do
  
        puts "beginning deployment to Heroku"
    end
    
    task :pretask do
        if(File.exist?('config/credentials.yml.enc'))
            sh "rm config/credentials.yml.enc"
        else
            puts "file does not exist."
        end
       Rake::Task["assets:clean"].invoke
       sh %{EDITOR="mate --wait" bin/rails credentials:edit}
        
    end    
    
    desc "migrates assets then rakes them to public for deployment."
    task :assetmigration do
        Rake::Task["db:migrate"].invoke
        Rake::Task["assetrake"].invoke
    end
    
    desc "Task description"
    task :commit, :message  do |t, args|
        message = args.message
        if message==nil
            message = "Source updated at #{Time.now}."
        end
        system "git add ."
        system "git commit -a -m \"#{message}\""
    end
    
    task :heroku_push do
        sh "git push heroku master --force"
    end
     
end