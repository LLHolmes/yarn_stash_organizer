class FinishProjectsController < ApplicationController
  before_action :find_project, only: [:edit, :update]
  before_action :auth_user

  def edit
  end

  def update
    if @project.update(project_params)
      @project.clear_to_stash
      redirect_to project_path(current_user.stash)
    else
      render :edit
    end
  end

  private
    def find_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(yarns_attributes: [:id, :count, :scrap, :project_id])
    end

    def auth_user
      if current_user == @project.user
      else
        flash['error'] = "You are not allowed to view or edit another users project."
        redirect_to projects_path
      end
    end
end
