class Project < ApplicationRecord
  belongs_to :user
  has_many :notes, dependent: :destroy
  has_many :tools
  has_many :yarns
  has_many :brands, -> { distinct }, through: :yarns

  accepts_nested_attributes_for :notes, reject_if: :all_blank

  validates_presence_of :name, :status
  validates_uniqueness_of :name, scope: :user_id

  def note_attributes=(attributes)
     note = Note.find_or_create_by(note: attributes[:note], project_id: self.id)
     note.update(attributes)
  end

  def yarns_attributes=(attributes)
     yarn = Yarn.find(id: attributes[:id])
     yarn.update(attributes)
     yarn.project = self.user.stash
     yarn.save
  end

  def tools_attributes=(attributes)
     tool = Tool.find(id: attributes[:id])
     tool.update(attributes)
     tool.project = self.user.stash
     tool.save
  end

  def yarns_by_brand
    self.yarns.sort_by { |yarn| yarn.color }.sort_by { |yarn| yarn.brand.name }
  end

  def prep_for_delete
    self.tools.each do |tool|
      tool.project = self.user.stash
      tool.save
    end

    self.yarns.each do |yarn|
      yarn.project = self.user.stash
      yarn.save
    end
  end

  # def yarns_sorted
  #   self.yarns_by_brand.sort_by { |yarn| yarn.brand.material }.sort_by { |yarn| yarn.brand.weight }
  # end

end
