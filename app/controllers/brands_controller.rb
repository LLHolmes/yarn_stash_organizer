class BrandsController < ApplicationController
  before_action :find_brand, only: [:show, :edit, :update, :destroy]

  def show
  end

  def new
    @brand = Brand.new
    5.times do
      @brand.yarns.build
    end
  end

  def create
    @brand = Brand.new(brand_params)
    if @brand.save
      redirect_to brand_path(@brand)
    else
      redirect_to yarns_path
    end
  end

  def edit
  end

  def update
    if @brand.update(brand_params)
      redirect_to brand_path(@brand)
    else
      render :edit
    end
  end

  def destroy
    @brand.destroy
    redirect_to root_path
  end

  private
    def find_brand
      @brand = Brand.find(params[:id])
    end

    def brand_params
      params.require(:brand).permit(
        :name, :material, :weight, :hook, :needle, :skein_weight, :skein_length,
        yarns_attributes: [:color, :count, :scrap, :project_id, :brand_id]
      )
    end

end
