SimpleNavigation::Configuration.run do |navigation|
  navigation.id_generator = Proc.new {|key| "menu-#{key}"}
  navigation.items do |primary|
    primary.item :home, 'Dashboard', admin_path, :if => Proc.new { in_admin? }
    primary.item :articles, 'News', admin_articles_path, :highlights_on => /admin\/articles/, :if => Proc.new { in_admin? }
    primary.item :albums, 'Albums', admin_albums_path, :highlights_on => /admin\/albums/, :if => Proc.new { in_admin? }
    primary.item :films, 'Films', admin_films_path, :highlights_on => /admin\/films/, :if => Proc.new { in_admin? }
    primary.item :pages, 'Pages', admin_pages_path, :highlights_on => /admin\/pages/, :if => Proc.new { in_admin? }

    primary.item :home, "HOME".html_safe, root_path, :if => Proc.new { !in_admin? }
    primary.item :articles, "WORK".html_safe, articles_path, :if => Proc.new { !in_admin? }
    #primary.item :films, "<span class='hidden'>Films</span>".html_safe, films_path, :highlights_on => /\/films/, :if => Proc.new { !in_admin? }
    #primary.item :albums, "<span class='hidden'>Photography</span>".html_safe, albums_path, :highlights_on => /\/albums/, :if => Proc.new { !in_admin? }
    primary.item :bio, "BIOGRAPHY".html_safe, page_path('bio'), :if => Proc.new { !in_admin? }
    primary.item :cv, "REVIEW".html_safe, page_path('cv'), :if => Proc.new { !in_admin? }
    primary.item :contact, "NEWS / CONTACT".html_safe, contact_path, :if => Proc.new { !in_admin? }
  end
end