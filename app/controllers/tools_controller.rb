class ToolsController < ApplicationController
  before_action :find_tool, only: [:edit, :update, :destroy]

  def index
    @tools =  Tool.all
  end

  def new
    @tool = Tool.new
  end

  def create
    @tool = Tool.new(tool_params)
    if @tool.save
    end
  end

  def edit
  end

  def update
    if @tool.update
    end
  end

  def destroy
    @tool.destroy
  end

  private
    def find_tool
      @tool = Tool.find(params[:id])
    end

    def tool_params
      params.require(:tool).permit(:name, :project_id)
    end

end
