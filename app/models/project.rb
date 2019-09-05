class Project < ApplicationRecord
  belongs_to :user
  has_many :notes, dependent: :destroy
  has_many :tools
  has_many :yarns
  has_many :brands, -> { distinct }, through: :yarns

  accepts_nested_attributes_for :notes, reject_if: :all_blank

  validates_presence_of :name, :status
  validates_uniqueness_of :name, scope: :user_id

  scope :wip, -> { where(status: "In Progress") }
  scope :upcoming, -> { where(status: "Upcoming") }
  scope :finished, -> { where(status: "Finished") }

  def note_attributes=(attributes)
     note = Note.find_or_create_by(note: attributes[:note], project_id: self.id)
     note.update(attributes)
  end

  def yarns_attributes=(yarns_attributes)
    yarns_attributes.values.each do |attributes|
      yarn = Yarn.find(attributes[:id])
      yarn.update(attributes)
    end
  end

  def project_yarns_by_color
    yarns.ordered_by_color
  end

  def yarns_by_brand
    self.project_yarns_by_color.includes(:brand).order('brands.name')
  end

  def clear_to_stash
    self.tools.each do |tool|
      tool.project = self.user.stash
      tool.save
    end

    self.yarns.each do |yarn|
      if !yarn.count || yarn.count <= 0
        if yarn.scrap.empty? || yarn.scrap.to_f == 0.0
          yarn.destroy
        end
      else
        yarn.project = self.user.stash
        yarn.save
      end
    end
  end

end
