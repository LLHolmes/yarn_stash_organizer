class NoteSerializer < ActiveModel::Serializer
  attributes :id, :note, :created
  # belongs_to :project

  def created
    "#{object.created_at.localtime.strftime("%m/%d/%Y, %l:%M %p")}"
  end

end
