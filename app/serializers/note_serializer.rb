class NoteSerializer < ActiveModel::Serializer
  attributes :id, :note, :created

  def created
    "#{object.created_at.localtime.strftime("%m/%d/%Y, %l:%M %p")}"
  end

end
