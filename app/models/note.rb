class Note < ApplicationRecord
  belongs_to :project
  validates_presence_of :note
end
