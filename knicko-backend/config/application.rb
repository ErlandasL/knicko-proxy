require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module KnickoBackend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # env_file = File.join(Rails.root, 'config', 'env.yml')
    # if File.exists?(env_file)
    #   YAML.load(File.open(env_file)).each do |key, value|
    #     ENV[key.upcase] = value unless value.is_a? Hash
    #   end
    # else
    #   raise "Missing #{env_file} file. Please create it and define your environment variables."
    # end

    if Rails.env.development? || Rails.env.test? || Rails.env.production?
      Dotenv::Rails.load
    end

    Rails.application.config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3000' # Update with your actual frontend URL

        resource '*',
                 headers: :any,
                 methods: [:get, :post, :put, :patch, :delete, :options, :head],
                 credentials: true
      end
    end

    config.session_store :cookie_store, key: "_YOUR_APP_session_#{Rails.env}"
    config.middleware.use ActionDispatch::Cookies # Required for all session management
    config.middleware.use ActionDispatch::Session::CookieStore, config.session_options

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
  end
end
