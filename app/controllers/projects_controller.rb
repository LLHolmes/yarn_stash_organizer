class ProjectsController < ApplicationController
  before_action :find_project, only: [:show, :edit, :update, :destroy]

  def index
    @stash = current_user.stash
    @wip = current_user.projects_wip
    @upcoming = current_user.projects_upcoming
    @finished = current_user.projects_finished
  end

  def show
  end

  def new
    @project = Project.new
    @project.notes.build
  end

  def create
    @project = current_user.projects.build(project_params)
    # binding.pry
    if @project.save
      redirect_to project_path(@project)
    else
      # @project.notes.build(note: params[:project][:notes_attributes]["0"][:note])
      # binding.pry
      render :new
    end
  end

  def edit
    @project.notes.build
  end

  def update
    if @project.update(project_params)
      redirect_to project_path(@project)
    else
      render :edit
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
      params.require(:project).permit(:name, :status, :pattern_info, notes_attributes: [:note], yarn_ids:[], tool_ids:[])
    end

end
