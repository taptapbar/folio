SimpleNavigation::Configuration.run do |navigation|
  navigation.id_generator = Proc.new {|key| "menu-#{key}"}
  navigation.items do |primary|
    primary.item :home, 'Dashboard', admin_path, :if => Proc.new { in_admin? }    
    primary.item :works, 'Works', admin_works_path, :hilights_on => /admin\/works/, :if => Proc.new { in_admin? }
    primary.item :reviews, 'Reviews', admin_reviews_path, :highlights_on => /admin\/reviews/, :if => Proc.new { in_admin? }
    primary.item :sidebars, 'Sidebars', admin_sidebars_path, :highlights_on => /admin\/sidebars/, :if => Proc.new { in_admin? }
    primary.item :articles, 'News', admin_articles_path, :highlights_on => /admin\/articles/, :if => Proc.new { in_admin? }
    primary.item :pages, 'Pages', admin_pages_path, :highlights_on => /admin\/pages/, :if => Proc.new { in_admin? }

    primary.item :home, "HOME".html_safe, root_path, :if => Proc.new { !in_admin? }
    primary.item :articles, "WORK".html_safe, articles_path, :if => Proc.new { !in_admin? }
    primary.item :bio, "BIOGRAPHY".html_safe, bio_path, :if => Proc.new { !in_admin? }
    primary.item :review, "REVIEW".html_safe, review_path, :if => Proc.new { !in_admin? }
    primary.item :news_and_contact, "NEWS / CONTACT".html_safe, news_and_contact_path, :if => Proc.new { !in_admin? }
  end
end