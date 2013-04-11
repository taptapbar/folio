class Sidebar < ActiveRecord::Base
  include ValidatesAsImage
  
  attr_accessible :description, :image, :link_to
  
  validates_as_image :image
  has_attached_file  :image, :styles => { :large => "306" }
  
  def self.all_custom_sidebars
    return [self.one('Biography'), self.one('Review'), self.one('News / Contact')]
  end
  
  def self.one(link_to_name)
    return nil if link_to_name.blank?
    unless sidebar = Sidebar.find_by_link_to(link_to_name)
      sidebar = Sidebar.create(:link_to => link_to_name, :description => "")
    end
    return sidebar
  end
end
