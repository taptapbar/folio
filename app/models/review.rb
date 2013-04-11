class Review < ActiveRecord::Base
  attr_accessible :date, :description, :pdf, :title

  has_attached_file :pdf

  validates :title, :presence => true
  validates :description, :presence => true
  validates :date, :presence => true

end
