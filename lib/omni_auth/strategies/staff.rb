module OmniAuth
  module Strategies
    class Staff < OmniAuth::Strategies::OAuth2

      option :name, :staff

      option :client_options, {
        site: Rails.application.secrets.staff_app_url,
        authorize_path: '/oauth/authorize'
      }

      uid do
        raw_info['id']
      end

      info do
        {
          email:          raw_info['email'],
          city_id:        raw_info['city_id'],
          avatar:         raw_info['avatar'],
          user_id:        raw_info['user_id'],
          timezone:       raw_info['timezone']
        }
      end

      def raw_info
        @raw_info ||= access_token.get('/api/staff_auth.json').parsed
      end

    end
  end
end
