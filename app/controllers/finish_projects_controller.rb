class FinishProjectsController < ApplicationController
  before_action :find_project, only: [:edit, :update]

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
end
