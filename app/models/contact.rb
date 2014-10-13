class Contact < ActiveRecord::Base
  validates :from,
            :message,
              :presence => true

  default_scope { order(:created_at => :desc) }
end
