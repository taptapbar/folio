class WorksController < ApplicationController
  def index
    @works = Work.all.paginate(:per_page => 3, :page => params[:page])
    
    respond_to do |format|
      format.html # index.html.erb
    end
  end
end