class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  has_many :projects, dependent: :destroy
  has_many :notes, -> { distinct }, through: :projects
  has_many :tools, -> { distinct }, through: :projects
  has_many :yarns, -> { distinct }, through: :projects
  has_many :brands, -> { distinct }, through: :yarns

  validates_presence_of :email, :name
  validates_uniqueness_of :email

  def initialize(attributes)
    super(attributes)
    self.projects.build(name: "Stash", status: "CONSTANT")
  end

  def self.from_omniauth(auth)
    @user = where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[8,20]
      user.name = auth.info.name   # assuming the user model has a name
    end
  end

  def stash
    self.projects.where(name: "Stash").first
  end

# For sorting:
  def brands_sorted
    brands.order(:weight).order(:name)
  end

  def brand_by_weight(gauge)
    self.brands_sorted.where(weight: gauge)
  end

  def yarns_sorted_by_brand
    brands_sorted.collect { |brand| brand.yarns_by_color }.flatten
  end

end
