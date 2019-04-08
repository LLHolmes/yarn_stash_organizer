class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :projects
  has_many :notes, -> { distinct }, through: :projects
  has_many :tools, -> { distinct }, through: :projects
  has_many :yarns, -> { distinct }, through: :projects
  has_many :brands, -> { distinct }, through: :yarns

  validates_uniqueness_of :email


end
