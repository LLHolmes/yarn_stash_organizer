class BrandsController < ApplicationController
  before_action :find_brand, only: [:show, :edit, :update, :destroy]

  def show  
    @brand_yarns = current_user.brand_yarns(@brand)
  end

  def new
    @brand = Brand.new
  end

  def create
    @brand = Brand.new(brand_params)
    if @brand.save
      redirect_to brand_path(@brand)
    else
      render :new
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
  end

  private
    def find_brand
      @brand = Brand.find(params[:id])
    end

    def brand_params
      params.require(:brand).permit(:name, :material, :weight, :hook, :needle, :skein_weight, :skein_length)
    end

end
