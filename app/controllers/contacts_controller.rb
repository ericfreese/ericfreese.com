class ContactsController < ApplicationController

  before_action :require_login, :only => [ :index, :show ]

  def index
    @contacts = Contact.all
  end

  def show
    @contact = Contact.find(params[:id])
  end

  def new
    @contact = Contact.new
    @hide_footer = true
  end

  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      flash[:contacted] = true
      cookies[:contacted] = true
      redirect_to contacted_path
    else
      render 'new'
    end
  end

  def contacted
    redirect_to root_path unless flash[:contacted].present?
  end

  private

  def contact_params
    params.required(:contact).permit(:from, :message)
  end
end
