class YarnsController < ApplicationController
  before_action :find_yarn, only: [:edit, :update, :destroy]

  def index
  end

  def new
    @yarn = Yarn.new
    @project = @yarn.build_project
    @brand = @yarn.build_brand
  end

  def create
    @yarn = Yarn.new(yarn_params)
    binding.pry
    if @yarn.save
      redirect_to yarns_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @yarn.update(yarn_params)
      redirect_to yarns_path
    else
      render :edit
    end
  end

  def destroy
    @yarn.destroy
    redirect_to yarns_path
  end

  private
    def find_yarn
      @yarn = Yarn.find(params[:id])
    end

    def yarn_params
      params.require(:yarn).permit(
        :color, :count, :scrap, :project_id, :brand_id,
        project_attributes: [:user_id, :name, :pattern_info, :status],
        brand_attributes: [:name, :material, :weight, :hook, :needle, :skein_weight, :skein_length]
      )
    end

end
