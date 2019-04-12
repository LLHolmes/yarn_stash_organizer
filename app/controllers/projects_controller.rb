class ProjectsController < ApplicationController
  before_action :find_project, only: [:show, :edit, :update, :destroy]

  def index
  end

  def show
  end

  def new
    @project = Project.new
    @project.notes.build
  end

  def create
    @project = current_user.projects.build(project_params)
    if @project.save
      redirect_to project_path(@project)
    else
      render :new
    end
  end

  def edit
    @project.notes.build
  end

  def update
    if @project.update(project_params)
      if @project.status == "Finished"
        render "finish_projects/edit"
      else
        redirect_to project_path(@project)
      end
    else
      render :edit
    end
  end

  def destroy
    @project.clear_to_stash
    @project.destroy
    redirect_to projects_path
  end

  private
    def find_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(:name, :status, :pattern_info, notes_attributes: [:note], yarn_ids:[], tool_ids:[])
    end

end
