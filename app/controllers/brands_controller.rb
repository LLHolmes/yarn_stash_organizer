class BrandsController < ApplicationController
  before_action :find_brand, only: [:show, :edit, :update, :destroy]

  def show
  end

  def new
    @brand = Brand.new
  end

  def create
    @brand = Brand.new(brand_params)
    if @brand.save
    end
  end

  def edit
  end

  def update
    if @brand.update
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
