class ToolsController < ApplicationController
  before_action :find_tool, only: [:edit, :update, :destroy]

  def index
  end

  def new
    @tool = Tool.new
    @project = @tool.build_project
  end

  def create
    @tool = Tool.new(tool_params)
    if @tool.save
      redirect_to tools_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @tool.update(tool_params)
      redirect_to tools_path
    else
      render :edit
    end
  end

  def destroy
    @tool.destroy
    redirect_to tools_path
  end

  private
    def find_tool
      @tool = Tool.find(params[:id])
    end

    def tool_params
      params.require(:tool).permit(:name, :project_id, project_attributes: [:user_id, :name, :pattern_info, :status])
    end

end
