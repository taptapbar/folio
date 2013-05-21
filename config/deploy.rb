require 'capistrano/ext/multistage'

set :stages, %w(dev production)
set :default_stage, "dev"