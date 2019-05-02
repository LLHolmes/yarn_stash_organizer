class ToolsController < ApplicationController
  before_action :find_tool, only: [:edit, :update, :destroy]
  before_action :auth_user, only: [:edit, :update, :destroy]

  def index
    if params[:project_id]
      @tools = Project.find(params[:project_id]).tools
    else
      @tools = current_user.tools
    end
  end

  def new
    if params[:project_id]
      @tool = Project.find(params[:project_id]).tools.build
    else
      @tool = Tool.new
      @project = @tool.build_project
    end
  end

  def create
    @tool = Tool.new(tool_params)
    if @tool.save
      redirect_to tools_path
    else
      @project = @tool.build_project
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

    def auth_user
      if current_user == @tool.project.user
      else
        flash['error'] = "You are not allowed to view or edit another users tool."
        redirect_to root_path
      end
    end

end
