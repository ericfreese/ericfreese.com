class PostsController < ApplicationController

  before_action :require_login, :except => :index

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to content_path(@post)
    else
      render 'new'
    end
  end

  private

  def post_params
    params.required(:post).permit(:title)
  end
end
