class SessionsController < ApplicationController
  before_filter :require_login, :only => :destroy

  def new
  end

  def create
    if Digest::MD5.hexdigest(params[:login][:password]) == ENV['PASSWORD']
      session[:loggedin] = true
      redirect_to root_path
    else
      render 'new'
    end
  end

  def destroy
    session.delete(:loggedin)
    redirect_to root_path
  end
end