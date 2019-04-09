class YarnsController < ApplicationController
  before_action :find_yarn, only: [:edit, :update, :destroy]

  def index
    @yarns =  Yarn.all
  end

  def new
    @yarn = Yarn.new
  end

  def create
    @yarn = Yarn.new(yarn_params)
    if @yarn.save
    end
  end

  def edit
  end

  def update
    if @yarn.update
    end
  end

  def destroy
    @yarn.destroy
  end

  private
    def find_yarn
      @yarn = Yarn.find(params[:id])
    end

    def yarn_params
      params.require(:yarn).permit(:color, :count, :scrap, :project_id, :brand_id)
    end

end
