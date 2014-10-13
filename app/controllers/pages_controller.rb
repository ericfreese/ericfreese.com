class PagesController < ApplicationController

  before_action :require_login

  def new
    @page = Page.new
  end

  def create
    @page = Page.new(page_params)

    if @page.save
      redirect_to content_path(@page)
    else
      render 'new'
    end
  end

  private

  def page_params
    params.required(:page).permit(:title)
  end
end
