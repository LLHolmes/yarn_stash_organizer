class FinishProjectsController < ApplicationController
  before_action :find_project, only: [:edit, :update]

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

  private
    def find_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(yarns_attributes: [:count, :scrap, :project_id])
    end
end
