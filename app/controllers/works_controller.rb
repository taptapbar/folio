class WorksController < ApplicationController
  def index
    @works = Work.all.paginate(:per_page => 20, :page => params[:page])
    
    respond_to do |format|
      format.json { render :json => @works }
    end
  end
end