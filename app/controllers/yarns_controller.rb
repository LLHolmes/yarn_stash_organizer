class YarnsController < ApplicationController
  before_action :find_yarn, only: [:edit, :update, :destroy]
  before_action :auth_user, only: [:edit, :update, :destroy]

  def index
    # if params[:brand_id]
    #   @yarns = Brand.find(params[:brand_id]).yarns
    # else
    #   @yarns = current_user.yarns
    # end
    
    @yarns = current_user.yarns
    respond_to do |f|
      f.html
      f.json {render json: @yarns}
    end
  end

  def new
    @yarn = Yarn.new
    @project = @yarn.build_project
    @brand = @yarn.build_brand
  end

  def create
    @yarn = Yarn.new(yarn_params)
    if @yarn.save
      redirect_to yarns_path
    else
      @project = @yarn.build_project
      @brand = @yarn.build_brand
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

    def auth_user
      if current_user == @yarn.project.user
      else
        flash['error'] = "You are not allowed to view or edit another users yarn."
        redirect_to root_path
      end
    end

end
