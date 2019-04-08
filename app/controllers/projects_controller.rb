class ProjectsController < ApplicationController
  before_action :find_project, only: [:show, :edit, :update, :destroy]

  def index
    @projects =  Project.all
  end

  def show
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    if @project.save
    end
  end

  def edit
  end

  def update
    if @project.update
    end
  end

  def destroy
    @project.destroy
  end

  private
    def find_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(:name, :status, :pattern_info)
    end

end
