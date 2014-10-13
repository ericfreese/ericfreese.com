class Content < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, :use => :slugged

  scope :active, -> { where(:active => true) }
  default_scope { active.order(:created_at => :desc) }

  validates :title, :presence => true
end
