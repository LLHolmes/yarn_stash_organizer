class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook, :google_oauth2]

  has_many :projects
  has_many :notes, -> { distinct }, through: :projects
  has_many :tools, -> { distinct }, through: :projects
  has_many :yarns, -> { distinct }, through: :projects
  has_many :brands, -> { distinct }, through: :yarns

  validates_uniqueness_of :email

  def self.from_omniauth(auth)
    @user = where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[8,20]
      user.name = auth.info.name   # assuming the user model has a name
      # user.image = auth.info.image # assuming the user model has an image
    end
  end

  def projects_finished
    self.projects.select { |project| project.status == "Finished" }
  end

  def projects_wip
    self.projects.select { |project| project.status == "In Progress" }
  end

  def projects_upcoming
    self.projects.select { |project| project.status == "Upcoming" }
  end

  def stash
    self.projects.detect { |project| project.name == "Stash" }
  end
  #
  # def yarns_by_brand
  #   self.yarns.sort_by { |yarn| yarn.color }.sort_by { |yarn| yarn.brand.name }
  # end
  #
  # def yarns_sorted
  #   self.yarns_by_brand.sort_by { |yarn| yarn.brand.material }.sort_by { |yarn| yarn.brand.weight }
  # end
  #
  def brands_sorted
    self.brands.sort_by { |brand| brand.name }.sort_by { |brand| brand.material }
  end

  def brand_by_weight(wt)
    self.brands_sorted.select { |brand| brand.weight == wt }
  end

  def yarns_sorted_by_brand
    brands_sorted.collect { |brand| brand.yarns_by_color }.flatten
  end

  # def brand_yarns(given_brand)
  #   self.yarns.select { |yarn| yarn.brand == given_brand }
  # end

end
