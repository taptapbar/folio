class Work < ActiveRecord::Base
  acts_as_publishable
  
  include ValidatesAsImage
  
  default_scope :order => "date DESC"
  
  attr_accessible :title, :date, :description, :image

  validates_as_image :image
  has_attached_file  :image, :styles => { large: "990", thumb: "138" }

  validates_attachment_presence :image
  #validates_attachment_size :image, :less_than => 5.megabytes, :if => Proc.new { |imports| !imports.data.file? }
  validates_as_image :image
  
  def caption
    [title, "<br>", description].join()
  end
  
  def as_json(options={})
    { 
      :work => {
        id: id,
        date: date,
        year: date.year,
        title: title,
        description: description,
        caption: caption,
        image_url_thumb: image.url(:thumb),
        image_url_large: image.url(:large)
      }
    }
  end

end
