require 'bundler/capistrano' # will now automatically run bundle install
require "capistrano-rbenv"
set :rbenv_ruby_version, "1.9.2-p318"

set :user,        "deployer"
set :domain,      "folio.detourlab.com"
set :application, "folio-dev"

set :repository,  "git@github.com:taptapbar/folio.git"
set :scm,         :git
set :branch,      "master"
set :scm_verbose, true
set :deploy_via,  :remote_cache
set :deploy_to,   "/home/#{user}/apps/#{application}"
set :use_sudo,    false
 
default_run_options[:pty] = true
ssh_options[:forward_agent] = true

role :web, domain
role :app, domain 
role :db,  domain, :primary => true

# Passenger mod_rails:
namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
  
  desc "Symlink config files and db"
  task :symlink_config do
    run "ln -s #{shared_path}/config/database.yml #{release_path}/config/database.yml"
    # run "ln -s #{shared_path}/config/api_keys.yml #{release_path}/config/api_keys.yml"
  end
end

#after "deploy:update_code", "deploy:config_symlink"
after "deploy:finalize_update", "deploy:symlink_config"