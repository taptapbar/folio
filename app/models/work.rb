class Work < ActiveRecord::Base
  include ValidatesAsImage
  
  attr_accessible :title, :date, :description, :image

  validates_as_image :image
  has_attached_file  :image, :styles => { large: "990",
  										  thumb: "138" }

  validates_attachment_presence :image
  #validates_attachment_size :image, :less_than => 5.megabytes, :if => Proc.new { |imports| !imports.data.file? }
  validates_as_image :image
  
  def caption
    title + "<br>" + description
  end

end
