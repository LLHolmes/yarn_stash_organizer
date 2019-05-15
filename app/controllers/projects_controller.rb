class ProjectsController < ApplicationController
  before_action :find_project, only: [:show, :edit, :update, :destroy]
  before_action :auth_user, only: [:show, :edit, :update, :destroy]

  def index
    @projects = current_user.projects
    respond_to do |f|
      f.html
      f.json {render json: @projects}
    end
  end

  def show
    respond_to do |f|
      f.html
      f.json {render json: @projects}
    end
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
      @project.notes.build
      render :new
    end
  end

  def edit
    @project.notes.build
  end

  def update
    if @project.update(project_params)
      if @project.status == "Finished"
        if !@project.yarns.empty?
          render "finish_projects/edit"
        else
          @project.clear_to_stash
          redirect_to project_path(@project)
        end
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

    def auth_user
      if current_user == @project.user
      else
        flash['error'] = "You are not allowed to view or edit another users project."
        redirect_to root_path
      end
    end

end
