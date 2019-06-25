# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_25_001052) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ads", force: :cascade do |t|
    t.bigint "user_id"
    t.text "description"
    t.boolean "for_sale"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_ads_on_user_id"
  end

  create_table "brands", force: :cascade do |t|
    t.string "name"
    t.string "material"
    t.string "weight"
    t.string "hook"
    t.string "needle"
    t.integer "skein_weight"
    t.integer "skein_length"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string "note"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_notes_on_project_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "yarn_id"
    t.bigint "ad_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ad_id"], name: "index_posts_on_ad_id"
    t.index ["yarn_id"], name: "index_posts_on_yarn_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.string "status"
    t.string "pattern_info"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "tools", force: :cascade do |t|
    t.string "name"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_tools_on_project_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "provider"
    t.string "uid"
    t.string "google_token"
    t.string "google_reset_token"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "yarns", force: :cascade do |t|
    t.string "color"
    t.integer "count"
    t.string "scrap"
    t.bigint "project_id"
    t.bigint "brand_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url"
    t.index ["brand_id"], name: "index_yarns_on_brand_id"
    t.index ["project_id"], name: "index_yarns_on_project_id"
  end

  add_foreign_key "ads", "users"
  add_foreign_key "posts", "ads"
  add_foreign_key "posts", "yarns"
end
