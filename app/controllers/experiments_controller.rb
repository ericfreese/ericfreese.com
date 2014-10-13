class ExperimentsController < ApplicationController

  before_action :require_login, :except => :index

  def index
    @experiments = Experiment.all
  end

  def new
    @experiment = Experiment.new
  end

  def create
    @experiment = Experiment.new(experiment_params)

    if @experiment.save
      redirect_to content_path(@experiment)
    else
      render 'new'
    end
  end

  private

  def experiment_params
    params.required(:experiment).permit(:title)
  end
end
