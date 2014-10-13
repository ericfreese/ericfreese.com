class ContentsController < ApplicationController

  before_action :require_login, :except => [ :index, :show ]

  def index
    @posts = Post.all.limit(3)
    @experiments = Experiment.all.limit(3)
  end

  def edit
    @content = Content.friendly.find(params[:id])
  end

  def show
    @content = Content.friendly.find(params[:id])

    render :layout => @content.type.underscore
  end

  def update
    @content = Content.friendly.find(params[:id])

    if @content.update(content_params)
      redirect_to content_path(@content)
    else
      render 'edit'
    end
  end

  private

  def content_params
    params.required(:content).permit(:title, :slug, :created_at, :preview)
  end
end
